# 🔧 Variables d'environnement pour Render

## 📊 Informations de la base PostgreSQL

✅ **Base PostgreSQL créée sur Render**

Host complet : `dpg-d3vsr6uuk2gs73b1lghg-a.oregon-postgres.render.com`

---

## 🔐 Variables d'environnement à configurer sur Render

Dans le dashboard Render → Votre Web Service → "Environment", ajoutez ces variables :

### ✅ Base de données

```env
DB_TYPE=postgres
DB_HOST=dpg-d3vsr6uuk2gs73b1lghg-a.oregon-postgres.render.com
DB_PORT=5432
DB_USERNAME=restrack_user
DB_PASSWORD=Y7Wm0US0yYcRQ1aK86rxHLlz7lfsimJW
DB_DATABASE=restrack
```

### ✅ JWT (Important - changez ces secrets !)

```env
JWT_SECRET=changez-moi-par-un-secret-aleatoire-tres-long-et-securise-environ-64-caracteres
REFRESH_TOKEN_SECRET=changez-moi-aussi-par-un-autre-secret-aleatoire-long-different-du-precedent
```

### ✅ Application

```env
NODE_ENV=production
PORT=3006
```

### ✅ CORS

```env
ALLOWED_ORIGINS=http://localhost:3000,https://votre-frontend.onrender.com
```

### ✅ Swagger

```env
SWAGGER_ENABLED=true
```

### ✅ Firebase (si utilisé)

```env
FIREBASE_PROJECT_ID=votre-project-id
FIREBASE_PRIVATE_KEY=votre-private-key
FIREBASE_CLIENT_EMAIL=votre-email
```

---

## 📋 Liste complète pour copier-coller

```env
DB_TYPE=postgres
DB_HOST=dpg-d3vsr6uuk2gs73b1lghg-a.oregon-postgres.render.com
DB_PORT=5432
DB_USERNAME=restrack_user
DB_PASSWORD=Y7Wm0US0yYcRQ1aK86rxHLlz7lfsimJW
DB_DATABASE=restrack
JWT_SECRET=changez-moi-secret-super-long-et-aleatoire-minimum-64-caracteres-requis
REFRESH_TOKEN_SECRET=changez-moi-aussi-autre-secret-super-long-et-aleatoire-different
NODE_ENV=production
PORT=3006
ALLOWED_ORIGINS=http://localhost:3000
SWAGGER_ENABLED=true
```

---

## ⚠️ IMPORTANT : Sécuriser les secrets JWT

### Générer des secrets sécurisés

```bash
# Option 1 : Avec openssl
openssl rand -base64 64

# Option 2 : Avec Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Changez les valeurs de JWT_SECRET et REFRESH_TOKEN_SECRET !**

---

## 🧪 Tester la connexion à la base

### Depuis votre terminal local

```bash
PGPASSWORD=Y7Wm0US0yYcRQ1aK86rxHLlz7lfsimJW psql -h dpg-d3vsr6uuk2gs73b1lghg-a.oregon-postgres.render.com -U restrack_user -d restrack
```

### Lancer une commande SQL

```sql
-- Voir les tables
\dt

-- Voir les utilisateurs
SELECT * FROM users;

-- Quitter
\q
```

---

## 🚀 Après configuration sur Render

1. Redéployez votre service (ou attendez le redéploiement automatique)
2. Les variables seront disponibles dans votre application
3. TypeORM se connectera automatiquement à PostgreSQL

---

## ✅ Vérifier la connexion

Une fois déployé, testez :

```bash
curl https://votre-backend.onrender.com/health
```

Vous devriez voir que la base de données est connectée.

---

**Votre backend est maintenant prêt à se connecter à la base PostgreSQL sur Render ! 🎉**

