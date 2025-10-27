# 🔄 Workflow de Messagerie - Guide Complet

## 📋 Vue d'ensemble des règles de sécurité

### ✅ Qui peut envoyer des messages privés ?

| Émetteur | Destinataire | Autorisé ? | Condition |
|----------|--------------|------------|-----------|
| Étudiant | Lui-même | ✅ Oui | Toujours autorisé |
| Étudiant | Étudiant ami | ✅ Oui | Relation `ACCEPTED` |
| Étudiant | Étudiant non-ami | ❌ Non | Erreur 403 |
| Étudiant | Étudiant bloqué | ❌ Non | Erreur 403 |
| Admin | N'importe qui | ✅ Oui | Pas de restriction |
| N'importe qui | Groupe (membre) | ✅ Oui | Si membre du groupe |
| N'importe qui | Groupe (non-membre) | ❌ Non | Erreur 403 |

---

## 🎯 Scénario 1 : Deux étudiants veulent discuter

### Étape 1 : Vérifier si déjà amis

```http
GET /api/messages/friends
Authorization: Bearer <token-etudiant-1>

// Réponse: []  → Pas encore amis
```

### Étape 2 : Envoyer une demande d'ami

```http
POST /api/messages/friends/request
Authorization: Bearer <token-etudiant-1>

{
  "studentId": 2
}

// ✅ Demande envoyée
```

### Étape 3 : L'étudiant 2 reçoit la demande

```http
GET /api/messages/friends/pending
Authorization: Bearer <token-etudiant-2>

// Réponse: [{ id: 1, requesterId: 1, studentId: 2, status: 'PENDING' }]
```

### Étape 4 : Accepter la demande

```http
PATCH /api/messages/friends/1/accept
Authorization: Bearer <token-etudiant-2>

// ✅ Maintenant amis (status: ACCEPTED)
```

### Étape 5 : Maintenant ils peuvent s'envoyer des messages !

```http
POST /api/messages
Authorization: Bearer <token-etudiant-1>

{
  "receiverId": 2,
  "receiverType": "STUDENT",
  "messageContent": "Salut ! On est amis maintenant 🎉"
}

// ✅ Message envoyé
// ✅ L'étudiant 2 reçoit en temps réel via WebSocket
```

---

## 🚫 Scénario 2 : Tentative d'envoi sans être ami

### Étape 1 : Essayer d'envoyer un message sans être ami

```http
POST /api/messages
Authorization: Bearer <token-etudiant-1>

{
  "receiverId": 3,
  "receiverType": "STUDENT",
  "messageContent": "Salut étranger!"
}

// ❌ Erreur 403 Forbidden
// Message: "Vous ne pouvez envoyer des messages qu'à vos amis. Envoyez d'abord une demande d'ami."
```

### ✅ Solution : Envoyer d'abord une demande d'ami

```http
POST /api/messages/friends/request
Authorization: Bearer <token-etudiant-1>

{
  "studentId": 3
}
```

---

## 👔 Scénario 3 : Un admin contacte un étudiant

### Les admins n'ont PAS besoin d'être amis

```http
POST /api/messages
Authorization: Bearer <token-admin>

{
  "receiverId": 1,
  "receiverType": "STUDENT",
  "messageContent": "Bonjour, votre demande de sortie a été approuvée."
}

// ✅ Message envoyé directement (pas besoin d'amitié)
```

---

## 💬 Scénario 4 : Messages de groupe

### Étape 1 : Créer un groupe

```http
POST /api/messages/groups
Authorization: Bearer <token-etudiant-1>

{
  "groupName": "Promotion 2025",
  "groupType": "STUDENT"
}

// ✅ Groupe créé, l'étudiant 1 est automatiquement membre
```

### Étape 2 : Ajouter des membres

```http
POST /api/messages/groups/1/members
Authorization: Bearer <token-etudiant-1>

{
  "userId": 2,
  "userType": "STUDENT"
}

// ✅ Étudiant 2 ajouté au groupe
```

### Étape 3 : Envoyer un message au groupe

```http
POST /api/messages
Authorization: Bearer <token-etudiant-1>

{
  "groupId": 1,
  "messageContent": "Salut à tous ! 👋"
}

// ✅ Tous les membres du groupe reçoivent le message
```

### Étape 4 : Un non-membre essaie d'envoyer

```http
POST /api/messages
Authorization: Bearer <token-etudiant-3>

{
  "groupId": 1,
  "messageContent": "Je veux participer!"
}

// ❌ Erreur 403 Forbidden
// Message: "Vous n'êtes pas membre de ce groupe"
```

---

## 🔒 Scénario 5 : Bloquer un utilisateur

### Étape 1 : Bloquer un ami

```http
PATCH /api/messages/friends/1/block
Authorization: Bearer <token-etudiant-1>

// ✅ Utilisateur bloqué (status: BLOCKED)
```

### Étape 2 : Tentative d'envoi de message

```http
POST /api/messages
Authorization: Bearer <token-etudiant-1>

{
  "receiverId": 2,
  "receiverType": "STUDENT",
  "messageContent": "Essai d'envoi..."
}

// ❌ Erreur 403 Forbidden
// Message: "Impossible d'envoyer un message à cet utilisateur"
```

---

## 🧪 Scénario 6 : S'envoyer un message à soi-même

### ✅ Toujours autorisé (notes personnelles, rappels, etc.)

```http
POST /api/messages
Authorization: Bearer <token-etudiant-1>

{
  "receiverId": 1,  // Son propre ID
  "receiverType": "STUDENT",
  "messageContent": "Note à moi-même : Ne pas oublier le TD de demain"
}

// ✅ Message envoyé sans vérification d'amitié
```

---

## 📊 Diagramme de flux : Envoi de message privé

```
┌─────────────────────────────────────────┐
│  Étudiant veut envoyer un message      │
└──────────────┬──────────────────────────┘
               │
               ▼
        ┌──────────────┐
        │ À soi-même ? │
        └──────┬───────┘
               │
        ┌──────┴───────┐
        │ OUI          │ NON
        ▼              ▼
   ┌─────────┐   ┌─────────────┐
   │ ✅ ENVOI│   │ Sont amis ? │
   └─────────┘   └──────┬──────┘
                        │
                 ┌──────┴───────┐
                 │ OUI          │ NON
                 ▼              ▼
            ┌─────────┐   ┌──────────────┐
            │ Bloqué? │   │ ❌ Erreur    │
            └────┬────┘   │ Envoyez une  │
                 │        │ demande d'ami│
          ┌──────┴──────┐ └──────────────┘
          │ OUI         │ NON
          ▼             ▼
    ┌──────────┐   ┌─────────┐
    │ ❌ Erreur│   │ ✅ ENVOI│
    └──────────┘   └─────────┘
```

---

## 🎯 Bonnes pratiques

### ✅ À FAIRE

1. **Vérifier l'amitié avant d'afficher le champ "Nouveau message"**
   ```typescript
   // Frontend
   async function canSendMessage(userId) {
     const friends = await fetch('/api/messages/friends');
     return friends.some(f => f.studentId === userId || f.requesterId === userId);
   }
   ```

2. **Gérer les erreurs 403 côté client**
   ```typescript
   try {
     await sendMessage(userId, content);
   } catch (error) {
     if (error.status === 403) {
       showNotification("Vous devez être ami pour envoyer un message");
       showFriendRequestButton(userId);
     }
   }
   ```

3. **Afficher un badge "Ami" sur les profils**
   ```typescript
   <UserProfile>
     {isFriend && <Badge>👥 Ami</Badge>}
     {!isFriend && <Button onClick={sendFriendRequest}>Ajouter</Button>}
   </UserProfile>
   ```

### ❌ À ÉVITER

1. Ne pas afficher de champ de message si non amis
2. Ne pas permettre l'envoi sans vérification côté client
3. Ne pas ignorer les erreurs 403

---

## 🔄 Flux complet : De l'inscription au premier message

```
1. Étudiant s'inscrit
   POST /api/users

2. Se connecte
   POST /api/auth/login

3. Cherche un autre étudiant
   GET /api/users

4. Envoie une demande d'ami
   POST /api/messages/friends/request

5. L'autre étudiant accepte
   PATCH /api/messages/friends/:id/accept

6. Connexion WebSocket
   io('http://localhost:3006/chat', { auth: { token } })

7. Envoie son premier message
   POST /api/messages

8. Reçoit la réponse en temps réel
   socket.on('message:new', (msg) => ...)
```

---

## 📝 Résumé des validations de sécurité

### Messages privés (étudiants)
✅ Vérification de l'amitié (status ACCEPTED)
✅ Exception pour messages à soi-même
✅ Blocage si relation BLOCKED
✅ Admins exemptés de ces règles

### Messages de groupe
✅ Vérification de l'appartenance au groupe
✅ Seuls les membres peuvent envoyer et lire

### Demandes d'ami
✅ Impossible de s'ajouter soi-même
✅ Détection de doublons
✅ Vérification bidirectionnelle (A→B ou B→A)

---

**🎉 Système de messagerie sécurisé et conforme aux bonnes pratiques !**
