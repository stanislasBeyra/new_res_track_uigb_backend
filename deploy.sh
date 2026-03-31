#!/bin/bash

set -u

# Configuration
# Chemin explicite côté serveur (à conserver pour éviter les scripts cassés).
APP_DIR="/home/hostrootci/uibgrestrack"
BRANCH="main"
APP_NAME="uibgrestrack-backend"
APP_PORT="3006"
HEALTHCHECK_URL="http://localhost:${APP_PORT}/api"
LOG_FILE="$APP_DIR/deploy_logs/deploy.log"
STATUS_FILE="$APP_DIR/deploy_logs/deploy-status.json"
DEPLOYMENTS_FILE="$APP_DIR/deploy_logs/deployments.json"
DEPLOYMENT_CURRENT_FILE="$APP_DIR/deploy_logs/deploy-current.json"
HISTORY_FILE="$APP_DIR/deploy_logs/deploy-history.json"
DURATIONS_FILE="$APP_DIR/deploy_logs/deploy-durations.json"

START_TIME=$(date +%s)
GIT_START_TIME=0
DEPS_START_TIME=0
BUILD_START_TIME=0
CLEAN_START_TIME=0
RESTART_START_TIME=0

mkdir -p "$APP_DIR/deploy_logs" 2>/dev/null || true
if [ ! -f "$DEPLOYMENTS_FILE" ]; then
  echo "[]" > "$DEPLOYMENTS_FILE"
fi
if [ ! -f "$HISTORY_FILE" ]; then
  echo '{"deployments": []}' > "$HISTORY_FILE"
fi

touch "$LOG_FILE" 2>/dev/null || true

echo "🚀 Deploy started at $(date)" > "$LOG_FILE" 2>&1
echo "📄 Live logs: $LOG_FILE"

# Affiche le fichier de log en direct dans le terminal
tail -f "$LOG_FILE" &
TAIL_PID=$!
cleanup_tail() {
  if [ -n "${TAIL_PID:-}" ] && kill -0 "$TAIL_PID" 2>/dev/null; then
    kill "$TAIL_PID" 2>/dev/null || true
  fi
}
trap cleanup_tail EXIT

update_status() {
  local status="$1"
  local message="$2"
  printf '{"status":"%s","message":"%s","timestamp":"%s"}\n' "$status" "$message" "$(date -u +"%Y-%m-%dT%H:%M:%SZ")" > "$STATUS_FILE"
}

save_deployment_history() {
  local status="$1"
  local message="$2"
  local commit_hash
  commit_hash=$(git -C "$APP_DIR" rev-parse --short HEAD 2>/dev/null || echo 'N/A')

  local new_entry
  new_entry=$(cat <<JSON
{"id":"$(date +%s)","status":"$status","message":"$message","timestamp":"$(date -u +"%Y-%m-%dT%H:%M:%SZ")","branch":"$BRANCH","commit":"$commit_hash"}
JSON
)

  local current
  current=$(cat "$HISTORY_FILE" 2>/dev/null || echo '{"deployments": []}')

  if command -v jq >/dev/null 2>&1; then
    echo "$current" | jq --argjson entry "$new_entry" '.deployments += [$entry]' > "$HISTORY_FILE"
  else
    # fallback sans jq
    if [ "$current" = '{"deployments": []}' ]; then
      printf '{"deployments":[%s]}\n' "$new_entry" > "$HISTORY_FILE"
    else
      echo "$current" | sed 's/\]\s*}$/,'"$new_entry"']}/' > "$HISTORY_FILE"
    fi
  fi
}

write_deployment_record() {
  local final="${1:-in_progress}"
  local now
  now=$(date +%s)
  local created_at
  created_at=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
  local commit_hash
  commit_hash=$(git -C "$APP_DIR" rev-parse --short HEAD 2>/dev/null || echo 'N/A')

  local starting_time=0
  if [ "$GIT_START_TIME" -gt 0 ]; then starting_time=$((GIT_START_TIME - START_TIME)); else starting_time=$((now - START_TIME)); fi

  local pulling_time=0
  if [ "$GIT_START_TIME" -gt 0 ] && [ "$DEPS_START_TIME" -gt 0 ]; then pulling_time=$((DEPS_START_TIME - GIT_START_TIME)); elif [ "$GIT_START_TIME" -gt 0 ]; then pulling_time=$((now - GIT_START_TIME)); fi

  local installing_time=0
  if [ "$DEPS_START_TIME" -gt 0 ] && [ "$BUILD_START_TIME" -gt 0 ]; then installing_time=$((BUILD_START_TIME - DEPS_START_TIME)); elif [ "$DEPS_START_TIME" -gt 0 ]; then installing_time=$((now - DEPS_START_TIME)); fi

  local building_time=0
  if [ "$BUILD_START_TIME" -gt 0 ] && [ "$CLEAN_START_TIME" -gt 0 ]; then building_time=$((CLEAN_START_TIME - BUILD_START_TIME)); elif [ "$BUILD_START_TIME" -gt 0 ]; then building_time=$((now - BUILD_START_TIME)); fi

  local cleaning_time=0
  if [ "$CLEAN_START_TIME" -gt 0 ] && [ "$RESTART_START_TIME" -gt 0 ]; then cleaning_time=$((RESTART_START_TIME - CLEAN_START_TIME)); elif [ "$CLEAN_START_TIME" -gt 0 ]; then cleaning_time=$((now - CLEAN_START_TIME)); fi

  local restarting_time=0
  if [ "$RESTART_START_TIME" -gt 0 ]; then restarting_time=$((now - RESTART_START_TIME)); fi

  local starting_status="in_progress"
  [ "$GIT_START_TIME" -gt 0 ] && starting_status="success"

  local pulling_status="pending"
  if [ "$DEPS_START_TIME" -gt 0 ]; then pulling_status="success"; elif [ "$GIT_START_TIME" -gt 0 ]; then pulling_status="in_progress"; fi

  local installing_status="pending"
  if [ "$BUILD_START_TIME" -gt 0 ]; then installing_status="success"; elif [ "$DEPS_START_TIME" -gt 0 ]; then installing_status="in_progress"; fi

  local building_status="pending"
  if [ "$CLEAN_START_TIME" -gt 0 ]; then building_status="success"; elif [ "$BUILD_START_TIME" -gt 0 ]; then building_status="in_progress"; fi

  local cleaning_status="pending"
  if [ "$RESTART_START_TIME" -gt 0 ]; then cleaning_status="success"; elif [ "$CLEAN_START_TIME" -gt 0 ]; then cleaning_status="in_progress"; fi

  local restarting_status="pending"
  if [ "$RESTART_START_TIME" -gt 0 ]; then restarting_status="in_progress"; fi
  if [ "$final" = "success" ] || [ "$final" = "error" ]; then restarting_status="$final"; fi

  local total_time=$((now - START_TIME))
  local id="$START_TIME"

  local json
  json=$(cat <<JSON
{"id":$id,"branch":"$BRANCH","commit_hash":"$commit_hash","starting_status":"$starting_status","starting_time":$starting_time,"pulling_status":"$pulling_status","pulling_time":$pulling_time,"installing_status":"$installing_status","installing_time":$installing_time,"building_status":"$building_status","building_time":$building_time,"cleaning_status":"$cleaning_status","cleaning_time":$cleaning_time,"restarting_status":"$restarting_status","restarting_time":$restarting_time,"final_status":"$final","total_time":$total_time,"created_at":"$created_at"}
JSON
)

  echo "$json" > "$DEPLOYMENT_CURRENT_FILE"

  if [ "$final" != "in_progress" ]; then
    local current
    current=$(cat "$DEPLOYMENTS_FILE" 2>/dev/null || echo "[]")
    if command -v jq >/dev/null 2>&1; then
      echo "$current" | jq --argjson newdeploy "$json" '. += [$newdeploy]' > "$DEPLOYMENTS_FILE"
    else
      if [ "$current" = "[]" ]; then
        printf '[%s]\n' "$json" > "$DEPLOYMENTS_FILE"
      else
        echo "$current" | sed 's/\]$//' | tr -d '\n' > "$DEPLOYMENTS_FILE.tmp"
        printf ', %s]\n' "$json" >> "$DEPLOYMENTS_FILE.tmp"
        mv "$DEPLOYMENTS_FILE.tmp" "$DEPLOYMENTS_FILE"
      fi
    fi
  fi
}

save_step_durations() {
  local current_time
  current_time=$(date +%s)
  local git_duration=$((DEPS_START_TIME - GIT_START_TIME))
  local deps_duration=$((BUILD_START_TIME - DEPS_START_TIME))
  local build_duration=$((CLEAN_START_TIME - BUILD_START_TIME))
  local clean_duration=$((RESTART_START_TIME - CLEAN_START_TIME))
  local restart_duration=$((current_time - RESTART_START_TIME))

  cat > "$DURATIONS_FILE" <<JSON
{
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "durations": {
    "git": $git_duration,
    "dependencies": $deps_duration,
    "build": $build_duration,
    "clean": $clean_duration,
    "restart": $restart_duration
  }
}
JSON
}

backup_uploads() {
  echo "📦 Backup automatique du code complet..." >> "$LOG_FILE" 2>&1
  # Stocker les backups hors du repo (serveur)
  local BACKUP_DIR="/home/hostrootci/backups/uibgrestrack"
  local DATE
  DATE=$(date +%Y%m%d-%H%M%S)
  local BACKUP_NAME="${APP_NAME}-full-backup-$DATE"

  mkdir -p "$BACKUP_DIR" 2>/dev/null || true

  if [ ! -d "$APP_DIR" ]; then
    echo "⚠️ Dossier application absent, backup ignoré" >> "$LOG_FILE" 2>&1
    return 0
  fi

  cd "$(dirname "$APP_DIR")" || return 0
  if tar -czf "$BACKUP_DIR/$BACKUP_NAME.tar.gz" \
    --exclude='node_modules' \
    --exclude='dist' \
    --exclude='logs' \
    --exclude='deploy_logs' \
    --exclude='backups' \
    --exclude='.git' \
    --exclude='*.log' \
    "$(basename "$APP_DIR")" >> "$LOG_FILE" 2>&1; then
    echo "✅ Backup créé: $BACKUP_NAME.tar.gz" >> "$LOG_FILE" 2>&1
    ls -1t "$BACKUP_DIR"/${APP_NAME}-full-backup-*.tar.gz 2>/dev/null | tail -n +6 | xargs rm -f 2>/dev/null || true
  else
    echo "⚠️ Erreur backup (non bloquante)" >> "$LOG_FILE" 2>&1
  fi

  cd "$APP_DIR" || true
}

export NODE_ENV=production

# Node path resolution
NODE_PATHS=(
  "$HOME/.nvm/versions/node/v22.18.0/bin"
  "$HOME/.nvm/versions/node/v20.19.5/bin"
  "$HOME/.nvm/versions/node/v18.17.0/bin"
  "/usr/local/bin"
  "/usr/bin"
)

for NODE_PATH in "${NODE_PATHS[@]}"; do
  if [ -d "$NODE_PATH" ] && [ -f "$NODE_PATH/npm" ]; then
    export PATH="$NODE_PATH:$PATH"
    echo "✅ Node trouvé: $NODE_PATH" >> "$LOG_FILE" 2>&1
    break
  fi
done

update_status "starting" "Deployment in progress..."
save_deployment_history "starting" "Deployment in progress..."
write_deployment_record "in_progress"

# [0/5] Backup
echo "[0/5] 💾 Backup..." >> "$LOG_FILE" 2>&1
backup_uploads

# [1/5] Git sync
echo "[1/5] 📥 Git sync..." >> "$LOG_FILE" 2>&1
GIT_START_TIME=$(date +%s)
update_status "pulling" "Syncing with remote repository..."
save_deployment_history "pulling" "Git sync in progress..."
write_deployment_record "in_progress"

cd "$APP_DIR" || { echo "❌ APP_DIR introuvable" >> "$LOG_FILE"; update_status "error" "APP_DIR not found"; write_deployment_record "error"; exit 1; }

if ! git fetch origin >> "$LOG_FILE" 2>&1; then
  echo "❌ Git fetch failed" >> "$LOG_FILE" 2>&1
  update_status "error" "Git fetch failed"
  save_deployment_history "error" "Git fetch failed"
  write_deployment_record "error"
  exit 1
fi

if ! git reset --hard "origin/$BRANCH" >> "$LOG_FILE" 2>&1; then
  echo "❌ Git reset failed" >> "$LOG_FILE" 2>&1
  update_status "error" "Git reset failed"
  save_deployment_history "error" "Git reset failed"
  write_deployment_record "error"
  exit 1
fi

# [2/5] Dependencies
echo "[2/5] 📦 Installing dependencies..." >> "$LOG_FILE" 2>&1
DEPS_START_TIME=$(date +%s)
update_status "installing" "Installing dependencies..."
save_deployment_history "installing" "Installing dependencies..."
write_deployment_record "in_progress"

rm -rf node_modules dist 2>/dev/null || true
npm cache clean --force >> "$LOG_FILE" 2>&1 || true

if ! npm install >> "$LOG_FILE" 2>&1; then
  echo "❌ npm install failed" >> "$LOG_FILE" 2>&1
  update_status "error" "Dependency installation failed"
  save_deployment_history "error" "Dependency installation failed"
  write_deployment_record "error"
  exit 1
fi

# [3/5] Build
echo "[3/5] 🔨 Building..." >> "$LOG_FILE" 2>&1
BUILD_START_TIME=$(date +%s)
update_status "building" "Building project..."
save_deployment_history "building" "Building project..."
write_deployment_record "in_progress"

if ! npm run build >> "$LOG_FILE" 2>&1; then
  echo "❌ Build failed" >> "$LOG_FILE" 2>&1
  update_status "error" "Build failed"
  save_deployment_history "error" "Build failed"
  write_deployment_record "error"
  exit 1
fi

if [ ! -f "$APP_DIR/dist/main.js" ]; then
  echo "❌ dist/main.js missing after build" >> "$LOG_FILE" 2>&1
  update_status "error" "Build incomplete: dist/main.js missing"
  save_deployment_history "error" "Build incomplete"
  write_deployment_record "error"
  exit 1
fi

# [4/5] Cleanup
echo "[4/5] 🧹 Cleanup..." >> "$LOG_FILE" 2>&1
CLEAN_START_TIME=$(date +%s)
update_status "cleaning" "Cleaning and optimization..."
save_deployment_history "cleaning" "Cleaning and optimization..."
write_deployment_record "in_progress"

find "$APP_DIR" -name "*.tmp" -delete 2>/dev/null || true
chmod -R 755 "$APP_DIR/dist" 2>/dev/null || true

# [5/5] Restart
echo "[5/5] 🔄 Restarting app..." >> "$LOG_FILE" 2>&1
RESTART_START_TIME=$(date +%s)
update_status "restarting" "Restarting application..."
save_deployment_history "restarting" "Restarting application..."
write_deployment_record "in_progress"

if ! command -v pm2 >/dev/null 2>&1; then
  echo "⚠️ PM2 not found, installing..." >> "$LOG_FILE" 2>&1
  npm install -g pm2 >> "$LOG_FILE" 2>&1 || {
    echo "❌ PM2 install failed" >> "$LOG_FILE" 2>&1
    update_status "error" "PM2 install failed"
    save_deployment_history "error" "PM2 install failed"
    write_deployment_record "error"
    exit 1
  }
fi

pm2 stop "$APP_NAME" >> "$LOG_FILE" 2>&1 || true
pm2 delete "$APP_NAME" >> "$LOG_FILE" 2>&1 || true

if [ -f "$APP_DIR/ecosystem.config.js" ]; then
  if ! pm2 start ecosystem.config.js --env production >> "$LOG_FILE" 2>&1; then
    echo "❌ PM2 ecosystem start failed" >> "$LOG_FILE" 2>&1
    update_status "error" "PM2 restart failed"
    save_deployment_history "error" "PM2 restart failed"
    write_deployment_record "error"
    exit 1
  fi
else
  if ! pm2 start "$APP_DIR/dist/main.js" --name "$APP_NAME" >> "$LOG_FILE" 2>&1; then
    echo "❌ PM2 dist/main.js start failed" >> "$LOG_FILE" 2>&1
    update_status "error" "PM2 restart failed"
    save_deployment_history "error" "PM2 restart failed"
    write_deployment_record "error"
    exit 1
  fi
fi

pm2 save >> "$LOG_FILE" 2>&1 || true

sleep 5
pm2 status >> "$LOG_FILE" 2>&1 || true

# Health check (optional)
if command -v curl >/dev/null 2>&1; then
  if curl -f -s "$HEALTHCHECK_URL" > /dev/null 2>&1; then
    echo "✅ Health check ok on $HEALTHCHECK_URL" >> "$LOG_FILE" 2>&1
  else
    echo "⚠️ Health check skipped/failed (non-blocking)" >> "$LOG_FILE" 2>&1
  fi
fi

update_status "success" "Deployment completed successfully"
save_deployment_history "success" "Deployment completed successfully"
write_deployment_record "success"
save_step_durations

echo "✅ Deployment finished at $(date)" >> "$LOG_FILE" 2>&1
exit 0