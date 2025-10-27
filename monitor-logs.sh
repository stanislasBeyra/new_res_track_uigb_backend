#!/bin/bash

echo "🔍 Monitoring des logs WebSocket en temps réel..."
echo "=================================================="
echo ""

# Fonction pour afficher les logs avec des couleurs
show_logs() {
    tail -f /dev/null 2>/dev/null | while read line; do
        if [[ $line == *"CONNEXION"* ]]; then
            echo -e "\033[32m$line\033[0m"  # Vert pour les connexions
        elif [[ $line == *"DÉCONNEXION"* ]]; then
            echo -e "\033[31m$line\033[0m"  # Rouge pour les déconnexions
        elif [[ $line == *"ENVOI MESSAGE"* ]]; then
            echo -e "\033[34m$line\033[0m"  # Bleu pour les messages
        elif [[ $line == *"WEBSOCKET"* ]]; then
            echo -e "\033[35m$line\033[0m"  # Magenta pour WebSocket
        else
            echo "$line"
        fi
    done
}

echo "📊 Instructions pour tester :"
echo "1. Ouvrez un autre terminal et lancez le frontend"
echo "2. Connectez-vous à l'application"
echo "3. Envoyez un message"
echo "4. Observez les logs ci-dessous..."
echo ""
echo "⏳ En attente des logs... (Ctrl+C pour quitter)"
echo ""

# Simuler l'affichage des logs (remplacez par la vraie commande de logs)
echo "🟢 NOUVELLE CONNEXION: Utilisateur 1 (STUDENT) - Socket: abc123"
echo "📊 STATISTIQUES: 1 utilisateur(s) connecté(s), 1 socket(s) total"
echo "📨 Tentative d'envoi de message: Émetteur 1 (STUDENT)"
echo "🚀 ENVOI WEBSOCKET: Message 123 vers utilisateur 2"
echo "📤 ENVOI MESSAGE: message:new vers utilisateur 2 (1 socket(s))"
echo "✅ Message envoyé via socket abc123"
echo "🎯 Message envoyé avec succès à l'utilisateur 2"
echo "📡 Résultat envoi WebSocket: SUCCÈS (utilisateur 2 connecté)"
echo ""
echo "💡 Pour voir les vrais logs, lancez: npm run start:dev"
echo "   Puis ouvrez l'application dans le navigateur et envoyez un message"
