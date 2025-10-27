# 💬 Système de Messagerie en Temps Réel - Guide Complet

## 📋 Vue d'ensemble

Le système de messagerie permet aux étudiants et admins de communiquer en temps réel via WebSocket et REST API.

---

## 🎯 Fonctionnalités

### ✅ Messages Privés
- Envoyer des messages 1-à-1 (étudiant ↔ étudiant, étudiant ↔ admin)
- Récupérer l'historique des conversations
- Marquer les messages comme lus
- Notifications en temps réel

### ✅ Groupes
- Créer des groupes (STUDENT, ADMIN, MIXED)
- Ajouter/retirer des membres
- Messages de groupe en temps réel
- Seul le créateur peut supprimer le groupe

### ✅ Amis
- Envoyer des demandes d'ami
- Accepter/rejeter les demandes
- Bloquer des utilisateurs
- Supprimer des amis

### ✅ Temps Réel (WebSocket)
- Réception instantanée des messages
- Indicateur "en train de taper..."
- Statut en ligne/hors ligne
- Rejoindre/quitter les groupes

---

## 🔌 Connexion WebSocket

### Namespace: `/chat`
**URL:** `ws://localhost:3006/chat`

### Authentification
Passer le token JWT dans le handshake :

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3006/chat', {
  auth: {
    token: 'your-jwt-token'
  }
});

// OU dans headers
const socket = io('http://localhost:3006/chat', {
  extraHeaders: {
    authorization: 'Bearer your-jwt-token'
  }
});
```

### Événements côté client

**Connexion réussie :**
```javascript
socket.on('connected', (data) => {
  console.log(data); // { message: 'Connected to chat', userId: 1, userType: 'STUDENT' }
});
```

**Nouveau message reçu :**
```javascript
socket.on('message:new', (message) => {
  console.log('Nouveau message:', message);
});
```

**Utilisateur en ligne :**
```javascript
socket.on('user:online', (data) => {
  console.log(`User ${data.userId} est en ligne`);
});
```

**Utilisateur hors ligne :**
```javascript
socket.on('user:offline', (data) => {
  console.log(`User ${data.userId} est hors ligne`);
});
```

**Indication "en train de taper" :**
```javascript
socket.on('message:typing', (data) => {
  console.log(`${data.senderId} est en train de taper...`);
});

socket.on('message:stop-typing', (data) => {
  console.log(`${data.senderId} a arrêté de taper`);
});
```

### Événements côté serveur (emit)

**Notifier que vous tapez :**
```javascript
socket.emit('message:typing', { receiverId: 2 });
socket.emit('message:stop-typing', { receiverId: 2 });
```

**Rejoindre un groupe :**
```javascript
socket.emit('group:join', { groupId: 1 });
// Réponse: { event: 'group:joined', data: { groupId: 1 } }
```

**Quitter un groupe :**
```javascript
socket.emit('group:leave', { groupId: 1 });
// Réponse: { event: 'group:left', data: { groupId: 1 } }
```

**Ping/Pong :**
```javascript
socket.emit('ping');
// Réponse: { event: 'pong', data: { timestamp: '2025-10-10T...' } }
```

**Liste des utilisateurs en ligne :**
```javascript
socket.emit('users:online');
// Réponse: { event: 'users:online:list', data: { userIds: [1, 2, 3] } }
```

---

## 🌐 API REST

### Base URL: `/api/messages`

## 📨 MESSAGES

### 1. Envoyer un message
```http
POST /api/messages
Authorization: Bearer <token>

{
  "receiverId": 2,           // Pour message privé
  "receiverType": "STUDENT", // STUDENT ou ADMIN
  "messageContent": "Bonjour!"
}

// OU pour groupe
{
  "groupId": 1,
  "messageContent": "Hello groupe!"
}
```

### 2. Récupérer toutes les conversations
```http
GET /api/messages/conversations
Authorization: Bearer <token>

// Réponse: liste des conversations avec dernier message
```

### 3. Récupérer une conversation privée
```http
GET /api/messages/conversation/:otherUserId/:otherUserType
Authorization: Bearer <token>

// Exemple: GET /api/messages/conversation/2/STUDENT
```

### 4. Marquer un message comme lu
```http
PATCH /api/messages/:id/read
Authorization: Bearer <token>
```

---

## 👥 GROUPES

### 1. Créer un groupe
```http
POST /api/messages/groups
Authorization: Bearer <token>

{
  "groupName": "Étudiants L3",
  "groupType": "STUDENT"  // STUDENT, ADMIN, MIXED
}
```

### 2. Récupérer mes groupes
```http
GET /api/messages/groups
Authorization: Bearer <token>
```

### 3. Récupérer un groupe
```http
GET /api/messages/groups/:id
Authorization: Bearer <token>
```

### 4. Récupérer les messages d'un groupe
```http
GET /api/messages/groups/:id/messages
Authorization: Bearer <token>
```

### 5. Ajouter un membre
```http
POST /api/messages/groups/:id/members
Authorization: Bearer <token>

{
  "userId": 3,
  "userType": "STUDENT"
}
```

### 6. Retirer un membre
```http
DELETE /api/messages/groups/:groupId/members/:userId/:userType
Authorization: Bearer <token>
```

### 7. Supprimer un groupe (créateur uniquement)
```http
DELETE /api/messages/groups/:id
Authorization: Bearer <token>
```

---

## 🤝 AMIS

### 1. Envoyer une demande d'ami
```http
POST /api/messages/friends/request
Authorization: Bearer <token>

{
  "studentId": 2
}
```

### 2. Accepter une demande
```http
PATCH /api/messages/friends/:id/accept
Authorization: Bearer <token>
```

### 3. Rejeter une demande
```http
PATCH /api/messages/friends/:id/reject
Authorization: Bearer <token>
```

### 4. Récupérer mes amis
```http
GET /api/messages/friends
Authorization: Bearer <token>
```

### 5. Demandes en attente
```http
GET /api/messages/friends/pending
Authorization: Bearer <token>
```

### 6. Bloquer un utilisateur
```http
PATCH /api/messages/friends/:id/block
Authorization: Bearer <token>
```

### 7. Supprimer un ami
```http
DELETE /api/messages/friends/:id
Authorization: Bearer <token>
```

---

## 🔐 Sécurité

- ✅ Authentification JWT requise pour toutes les routes
- ✅ **Messages privés uniquement entre amis** (ou à soi-même)
  - Les étudiants doivent être amis pour s'envoyer des messages privés
  - Les admins peuvent envoyer des messages à n'importe qui
  - On peut toujours s'envoyer un message à soi-même
- ✅ Validation des permissions (seuls les membres du groupe peuvent voir les messages)
- ✅ Le créateur seul peut supprimer le groupe
- ✅ Impossible de s'ajouter soi-même en ami
- ✅ Validation des doublons (demandes d'ami existantes)
- ✅ Vérification automatique des relations bloquées

---

## 📊 Statuts

### FriendStatus
- `PENDING` - En attente
- `ACCEPTED` - Accepté
- `REJECTED` - Rejeté
- `BLOCKED` - Bloqué

### GroupType
- `STUDENT` - Étudiants uniquement
- `ADMIN` - Admins uniquement
- `MIXED` - Mixte

### SenderType / ReceiverType
- `STUDENT` - Étudiant
- `ADMIN` - Administrateur

---

## 🧪 Exemple d'utilisation complète (Frontend)

```typescript
// 1. Connexion WebSocket
const socket = io('http://localhost:3006/chat', {
  auth: { token: localStorage.getItem('token') }
});

// 2. Écouter les événements
socket.on('connected', (data) => console.log('Connecté:', data));
socket.on('message:new', (msg) => displayMessage(msg));
socket.on('user:online', (data) => updateUserStatus(data.userId, true));

// 3. Envoyer un message privé (REST)
const response = await fetch('http://localhost:3006/api/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    receiverId: 2,
    receiverType: 'STUDENT',
    messageContent: 'Salut!'
  })
});

// 4. Le destinataire reçoit via WebSocket automatiquement
socket.on('message:new', (message) => {
  console.log('Message reçu:', message);
  // Afficher dans l'UI
});

// 5. Indication "en train de taper"
inputField.addEventListener('input', () => {
  socket.emit('message:typing', { receiverId: currentChatUserId });

  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    socket.emit('message:stop-typing', { receiverId: currentChatUserId });
  }, 1000);
});
```

---

## ✅ Test de fonctionnement

1. **Démarrer le serveur** : `npm run start:dev`
2. **Accéder à Swagger** : http://localhost:3006/docs
3. **Se connecter** : POST `/api/auth/login`
4. **Copier le token JWT**
5. **Tester les routes Messages** dans Swagger
6. **Tester WebSocket** : Utiliser un client comme Postman ou socket.io-client

---

## 🎉 Fonctionnalités en temps réel

✅ Messages privés instantanés
✅ Messages de groupe instantanés
✅ Indicateur "en train de taper..."
✅ Statut en ligne/hors ligne
✅ Liste des utilisateurs connectés
✅ Notifications de demandes d'ami
✅ Support multi-appareils (même utilisateur, plusieurs connexions)

---

**Système de messagerie complet implémenté ! 🚀**
