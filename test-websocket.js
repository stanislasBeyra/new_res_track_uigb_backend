#!/usr/bin/env node

const io = require('socket.io-client');

console.log('🧪 Test de connexion WebSocket...');

// Test avec un token JWT fictif (remplacez par un vrai token)
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInJvbGUiOiJTVFVERU5UIiwiaWF0IjoxNzM0NzQ4MDAwLCJleHAiOjE3MzQ3NTE2MDB9.fake-token';

const socket = io('http://localhost:3006/chat', {
  auth: { token }
});

socket.on('connect', () => {
  console.log('✅ Connexion WebSocket réussie !');
  console.log('🆔 Socket ID:', socket.id);
});

socket.on('disconnect', () => {
  console.log('❌ Connexion WebSocket fermée');
});

socket.on('connected', (data) => {
  console.log('📨 Confirmation de connexion reçue:', data);
});

socket.on('message:new', (message) => {
  console.log('🔔 NOUVEAU MESSAGE REÇU:', message);
});

socket.on('error', (error) => {
  console.error('❌ Erreur WebSocket:', error);
});

// Garder le script en vie
process.on('SIGINT', () => {
  console.log('\n👋 Fermeture du test...');
  socket.disconnect();
  process.exit(0);
});

console.log('⏳ En attente de connexion... (Ctrl+C pour quitter)');
