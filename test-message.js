#!/usr/bin/env node

const axios = require('axios');

console.log('🧪 Test d\'envoi de message via API...');

// Configuration
const API_URL = 'http://localhost:3006/api';
const LOGIN_EMAIL = 'test@example.com'; // Remplacez par un email valide
const LOGIN_PASSWORD = 'password123'; // Remplacez par un mot de passe valide

async function testMessageSending() {
  try {
    // 1. Se connecter pour obtenir un token
    console.log('🔐 Connexion...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: LOGIN_EMAIL,
      password: LOGIN_PASSWORD
    });
    
    const { accessToken, user } = loginResponse.data;
    console.log('✅ Connexion réussie !');
    console.log('👤 Utilisateur:', user.firstName, user.lastName);
    console.log('🔑 Token:', accessToken.substring(0, 20) + '...');
    
    // 2. Envoyer un message de test
    console.log('\n📨 Envoi d\'un message de test...');
    const messageResponse = await axios.post(`${API_URL}/messages`, {
      receiverId: 2, // Remplacez par un ID d'utilisateur valide
      messageContent: `Test WebSocket - ${new Date().toISOString()}`
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    console.log('✅ Message envoyé avec succès !');
    console.log('📋 Réponse:', messageResponse.data);
    
  } catch (error) {
    console.error('❌ Erreur:', error.response?.data || error.message);
  }
}

testMessageSending();
