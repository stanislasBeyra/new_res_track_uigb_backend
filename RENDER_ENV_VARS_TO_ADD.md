# 📋 Variables d'environnement à ajouter sur Render

## ⚠️ IMPORTANT

Ces variables doivent être ajoutées dans le **Dashboard Render** (pas dans un fichier commité) :

1. Allez sur https://render.com
2. Sélectionnez votre Web Service
3. Cliquez sur "Environment"
4. Ajoutez chaque variable une par une

---

## 🔐 Variables à ajouter

### Base de données

```
DB_TYPE=postgres
```

```
DB_HOST=dpg-d3vsr6uuk2gs73b1lghg-a.oregon-postgres.render.com
```

```
DB_PORT=5432
```

```
DB_USERNAME=restrack_user
```

```
DB_PASSWORD=Y7Wm0US0yYcRQ1aK86rxHLlz7lfsimJW
```

```
DB_DATABASE=restrack
```

### JWT Secrets

```
JWT_SECRET=yPDnwdO2MaGE9zWjqq8rWlR334YZ9uLQR/sMu6B7L9hMK1J6pBiqGecEM39cmvDfBFDEN3sOFrH9njDZdEPLvw==
```

```
REFRESH_TOKEN_SECRET=Wc5JlWlUWnmDcmN3keLIQJRjcv6NEeHDYc0HLrn07OSzlfGsZ+QcyFm1GbUNsARsLzyO0CPEfP413kRxnmSEjQ==
```

### Application

```
NODE_ENV=production
```

```
PORT=3006
```

### CORS

```
ALLOWED_ORIGINS=http://localhost:3000
```

### Swagger

```
SWAGGER_ENABLED=true
```

---

## ✅ Comment les ajouter

Pour **chaque variable** :

1. Cliquez sur "+ Add Environment Variable"
2. Tapez le **Key** (ex: `DB_TYPE`)
3. Tapez le **Value** (ex: `postgres`)
4. Cliquez sur "Save Changes"

Répétez pour toutes les variables listées ci-dessus.

---

## 🎯 Alternative : URL de connexion complète

Si Render fournit une **URL de connexion complète** (DATABASE_URL), vous pouvez utiliser ça à la place :

```
DATABASE_URL=postgresql://restrack_user:Y7Wm0US0yYcRQ1aK86rxHLlz7lfsimJW@dpg-d3vsr6uuk2gs73b1lghg-a.oregon-postgres.render.com:5432/restrack
```

Mais la configuration séparée est plus claire.

---

## 🔒 Sécurité

✅ **À FAIRE :**
- Ajouter ces variables dans Render Dashboard
- Les variables sont chiffrées sur Render
- Render ne les expose pas publiquement

❌ **NE PAS FAIRE :**
- Commiter ces valeurs dans Git
- Les partager publiquement
- Les mettre dans des fichiers `.env` commités

---

## ✅ Après avoir ajouté toutes les variables

Redéployez votre service pour que les changements prennent effet.

---

**Une fois toutes les variables ajoutées sur Render, votre backend sera configuré ! 🎉**

