# 🚂 Déploiement sur Railway

## Pourquoi Railway ?

Railway supporte :
- ✅ WebSocket (connexions persistantes)
- ✅ Applications long-running (pas serverless)
- ✅ Variables d'environnement
- ✅ PostgreSQL ou MySQL
- ✅ Build automatique depuis GitHub

## Étapes de déploiement

### 1. Créer un compte Railway
- Aller sur https://railway.app
- Se connecter avec GitHub

### 2. Créer un nouveau projet
1. Cliquez sur "New Project"
2. Sélectionnez "Deploy from GitHub repo"
3. Sélectionnez votre repository ResumeTrack

### 3. Configuration du service
- **Root Directory**: `restrack_backend`
- **Build Command**: `npm install --include=dev && npm run build`
- **Start Command**: `npm run start:prod`

### 4. Variables d'environnement
Dans Railway Dashboard → Variables, ajouter :

```env
NODE_ENV=production
PORT=3000

# Base de données MySQL (à adapter selon votre besoin)
DB_TYPE=mysql
DB_HOST=mysql-kouao.alwaysdata.net
DB_PORT=3306
DB_USERNAME=kouao
DB_PASSWORD=Stanislas@001
DB_DATABASE=kouao_uigb_restrack

# JWT
JWT_SECRET=votre_secret_jwt
JWT_EXPIRATION=30d
REFRESH_TOKEN_SECRET=votre_refresh_secret
REFRESH_TOKEN_EXPIRATION=90d

# Push notifications (désactivé)
PUSH_NOTIFICATIONS_ENABLED=false

# CORS
CORS_ORIGIN=https://votre-frontend.vercel.app,https://votre-domaine.com
```

### 5. Mettre à jour le frontend
Dans votre `.env` du frontend Vercel :

```env
NEXT_PUBLIC_API_URL=https://votre-app.railway.app/api
NEXT_PUBLIC_API_URL_IMAGE=https://votre-app.railway.app
```

## Coût Railway

- Plan gratuit : $5 de crédit/mois
- Conviendra pour tester
- Plan payant ensuite si nécessaire

## Alternative : Render.com

Render.com offre un plan gratuit mais peut avoir des limites :
- Sleep après 15 min d'inactivité
- WebSocket fonctionne mais avec limitations

---

## ⚠️ Important

- Le **frontend Next.js** reste sur Vercel
- Le **backend NestJS** avec WebSocket doit être sur Railway/Render
- Pas possible de tout mettre sur Vercel car WebSocket n'est pas supporté

