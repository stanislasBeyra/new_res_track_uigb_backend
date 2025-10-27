# 🚀 Déploiement sur Render - Guide Complet

## ✅ Configuration effectuée

J'ai configuré votre backend pour Render avec :
- ✅ Support PostgreSQL (Render utilise PostgreSQL)
- ✅ Driver `pg` installé
- ✅ Configuration flexible (MySQL local, PostgreSQL sur Render)
- ✅ SSL configuré pour production

---

## 📋 Étapes de déploiement sur Render

### Étape 1 : Créer un compte Render

1. Allez sur **https://render.com**
2. Cliquez sur **"Get Started for Free"**
3. Créez un compte (gratuit, pas de carte bancaire !)
4. Connectez avec GitHub

### Étape 2 : Créer une base PostgreSQL

1. Dans le dashboard Render, cliquez sur **"New +"**
2. Sélectionnez **"PostgreSQL"**
3. **Gratuit** → Cliquez sur **"Create Database"**
4. Render va créer votre base de données

**Copiez les variables d'environnement affichées :**
- `DB_HOST`
- `DB_PORT` (5432)
- `DB_USERNAME`
- `DB_PASSWORD`
- `DB_DATABASE`

### Étape 3 : Créer le Web Service

1. Dans le dashboard, cliquez sur **"New +"**
2. Sélectionnez **"Web Service"**
3. Connectez votre repository GitHub
4. Sélectionnez `maeva_projet` → `restrack_backend`

### Étape 4 : Configuration du Web Service

Render va détecter automatiquement votre projet NestJS. Vérifiez ces réglages :

**Build Command :**
```bash
npm install && npm run build
```

**Start Command :**
```bash
npm run start:prod
```

**Root Directory :**
```
restrack_backend
```

### Étape 5 : Variables d'environnement

Dans **"Environment"**, ajoutez ces variables :

#### ✅ Variables de base de données (copiées depuis PostgreSQL)
```env
DB_TYPE=postgres
DB_HOST=dpg-xxxxx.oregon-postgres.render.com
DB_PORT=5432
DB_USERNAME=restrack_user
DB_PASSWORD=votre-password-copie
DB_DATABASE=restrack
```

#### ✅ JWT Secrets
```env
JWT_SECRET=un-secret-super-long-et-aleatoire-changez-moi-en-production
REFRESH_TOKEN_SECRET=un-autre-secret-super-long-et-aleatoire
```

#### ✅ Application
```env
NODE_ENV=production
PORT=3006
```

#### ✅ CORS
```env
ALLOWED_ORIGINS=http://localhost:3000,https://votre-frontend.vercel.app
```

#### ✅ Swagger
```env
SWAGGER_ENABLED=true
```

#### ✅ Firebase (si vous utilisez)
```env
FIREBASE_PROJECT_ID=votre-project-id
FIREBASE_PRIVATE_KEY=votre-private-key
FIREBASE_CLIENT_EMAIL=votre-client-email
```

### Étape 6 : Créer le lien entre DB et Web Service

1. Dans votre Web Service, allez dans **"Environment"**
2. Cliquez sur **"Link DB"**
3. Sélectionnez votre base PostgreSQL
4. Render ajoutera automatiquement les variables DB_*

### Étape 7 : Déployer

1. Cliquez sur **"Create Web Service"** ou **"Manual Deploy"**
2. Attendez que le build se termine (~2-3 minutes)
3. Votre app sera disponible sur : `https://restrack-backend.onrender.com`

---

## 🌐 URLs après déploiement

Votre backend sera accessible sur :

- **API** : `https://restrack-backend.onrender.com/api`
- **Swagger** : `https://restrack-backend.onrender.com/docs`
- **WebSocket** : `wss://restrack-backend.onrender.com/chat` ✅
- **Health** : `https://restrack-backend.onrender.com/health`

---

## 📱 Mettre à jour le Frontend

### 1. Mettre à jour `restrack_front/src/lib/api.ts`

```typescript
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://restrack-backend.onrender.com/api",
    // ...
});
```

### 2. Créer `.env.local` dans `restrack_front`

```env
NEXT_PUBLIC_API_URL=https://restrack-backend.onrender.com/api
NEXT_PUBLIC_WS_URL=wss://restrack-backend.onrender.com
```

### 3. Mettre à jour les WebSockets

Dans `restrack_front/src/store/socketStore.ts` ou similaire :

```typescript
const socket = io(process.env.NEXT_PUBLIC_WS_URL || 'https://restrack-backend.onrender.com', {
  path: '/chat',
  auth: { token }
});
```

---

## ✅ Vérifier le déploiement

### 1. Health Check

```bash
curl https://restrack-backend.onrender.com/health
```

### 2. Swagger Documentation

Ouvrez dans votre navigateur :
```
https://restrack-backend.onrender.com/docs
```

### 3. Tester un endpoint

```bash
curl https://restrack-backend.onrender.com/api/users
```

---

## ⚠️ Important : Dormance du service gratuit

**Le plan gratuit de Render** met le service en **veille après 15 minutes d'inactivité**.

**Première requête** après inactivité :
- ⏱️ Temps de réveil : ~30-60 secondes
- ⚠️ La première requête sera lente
- ✅ Les requêtes suivantes seront normales

**C'est normal et acceptable pour le développement !**

---

## 🔒 HTTPS automatique

Render fournit automatiquement :
- ✅ Certificat SSL/TLS
- ✅ HTTPS actif
- ✅ Domaine `.onrender.com`

---

## 📊 Monitoring

Dans le dashboard Render :
- **Logs en temps réel**
- **Métriques de performance**
- **Historique des déploiements**

---

## 🔄 Déploiements automatiques

Si vous avez connecté GitHub :

1. Push vos changements :
```bash
git add .
git commit -m "Deploy to Render"
git push origin main
```

2. Render **déploie automatiquement** en ~3 minutes

---

## 🧪 Test local avec PostgreSQL

Si vous voulez tester localement avant de déployer :

```bash
# Installer PostgreSQL localement
brew install postgresql

# Créer une base de test
createdb residence_db

# Mettre à jour .env
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=votre-username
DB_PASSWORD=
DB_DATABASE=residence_db
```

---

## ✅ Checklist de déploiement

- [ ] Compte Render créé
- [ ] Base PostgreSQL créée sur Render
- [ ] Web Service créé
- [ ] Variables d'environnement configurées
- [ ] Lien entre DB et Web Service créé
- [ ] Build réussi
- [ ] URLs testées (API, Swagger, WebSocket)
- [ ] Frontend mis à jour
- [ ] Test de connexion WebSocket

---

## 🎉 C'est tout !

Votre backend est maintenant **100% prêt pour Render** avec :
- ✅ PostgreSQL configuré
- ✅ WebSocket fonctionnel
- ✅ HTTPS automatique
- ✅ Déploiement gratuit
- ✅ Pas de carte bancaire requise

**Suivez les étapes ci-dessus et vous serez déployé en 10 minutes ! 🚀**

Souhaitez-vous que je vous guide étape par étape ?

