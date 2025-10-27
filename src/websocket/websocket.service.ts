import { Injectable, Logger } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class WebsocketService {
  private readonly logger = new Logger(WebsocketService.name);
  private connectedUsers: Map<number, string[]> = new Map(); // userId -> socketIds[]
  private userTypes: Map<string, string> = new Map(); // socketId -> userType
  private socketToUser: Map<string, { userId: number; userType: string }> = new Map(); // socketId -> user info

  // ============= GESTION DES CONNEXIONS =============

  /**
   * Enregistrer une nouvelle connexion utilisateur
   */
  registerConnection(socketId: string, userId: number, userType: string): void {
    // Ajouter à la map des utilisateurs connectés
    const userSockets = this.connectedUsers.get(userId) || [];
    userSockets.push(socketId);
    this.connectedUsers.set(userId, userSockets);

    // Enregistrer le type d'utilisateur
    this.userTypes.set(socketId, userType);
    this.socketToUser.set(socketId, { userId, userType });

    this.logger.log(`🟢 NOUVELLE CONNEXION: Utilisateur ${userId} (${userType}) - Socket: ${socketId}`);
    this.logger.log(`📊 STATISTIQUES: ${this.connectedUsers.size} utilisateur(s) connecté(s), ${this.getTotalConnections()} socket(s) total`);
  }

  /**
   * Désenregistrer une connexion utilisateur
   */
  unregisterConnection(socketId: string): { userId: number; userType: string; isLastConnection: boolean } | null {
    const userInfo = this.socketToUser.get(socketId);

    if (!userInfo) {
      return null;
    }

    const { userId, userType } = userInfo;

    // Retirer de la map
    const userSockets = this.connectedUsers.get(userId) || [];
    const filteredSockets = userSockets.filter((id) => id !== socketId);

    let isLastConnection = false;

    if (filteredSockets.length > 0) {
      this.connectedUsers.set(userId, filteredSockets);
    } else {
      this.connectedUsers.delete(userId);
      isLastConnection = true;
    }

    this.userTypes.delete(socketId);
    this.socketToUser.delete(socketId);

    this.logger.log(`🔴 DÉCONNEXION: Utilisateur ${userId} (${userType}) - Socket: ${socketId}`);
    this.logger.log(`📊 STATISTIQUES: ${this.connectedUsers.size} utilisateur(s) connecté(s), ${this.getTotalConnections()} socket(s) total`);

    return { userId, userType, isLastConnection };
  }

  // ============= ENVOI DE MESSAGES =============

  /**
   * Envoyer un message à un utilisateur spécifique
   */
  sendToUser(server: Server, userId: number, event: string, data: any): boolean {
    const userSockets = this.connectedUsers.get(userId);

    if (!userSockets || userSockets.length === 0) {
      this.logger.warn(`❌ UTILISATEUR ${userId} NON CONNECTÉ - Message non envoyé`);
      return false;
    }

    this.logger.log(`📤 ENVOI MESSAGE: ${event} vers utilisateur ${userId} (${userSockets.length} socket(s))`);
    this.logger.log(`📋 Contenu du message:`, JSON.stringify(data, null, 2));

    userSockets.forEach((socketId) => {
      server.to(socketId).emit(event, data);
      this.logger.log(`✅ Message envoyé via socket ${socketId}`);
    });

    this.logger.log(`🎯 Message envoyé avec succès à l'utilisateur ${userId}`);
    return true;
  }

  /**
   * Envoyer un message à plusieurs utilisateurs (pour les groupes)
   */
  sendToMultipleUsers(server: Server, userIds: number[], event: string, data: any): void {
    this.logger.log(`📤 ENVOI MESSAGE GROUPE: ${event} vers ${userIds.length} utilisateurs`);
    this.logger.log(`👥 Utilisateurs cibles: ${userIds.join(', ')}`);
    
    let sentCount = 0;

    userIds.forEach((userId) => {
      if (this.sendToUser(server, userId, event, data)) {
        sentCount++;
      }
    });

    this.logger.log(`📊 RÉSULTAT GROUPE: ${sentCount}/${userIds.length} messages envoyés avec succès`);
  }

  /**
   * Broadcaster à tous les utilisateurs connectés sauf l'émetteur
   */
  broadcastExcept(server: Server, excludeSocketId: string, event: string, data: any): void {
    this.logger.debug(`🔄 Broadcasting event "${event}" to all except ${excludeSocketId}`);

    if (!server) {
      this.logger.error(`❌ Server is undefined`);
      return;
    }

    // server.sockets est déjà la Map des sockets connectés
    const socketsMap = server.sockets as unknown as Map<string, any>;

    if (!socketsMap) {
      this.logger.error(`❌ Sockets map is undefined`);
      return;
    }

    this.logger.debug(`📊 Total sockets in namespace: ${socketsMap.size}`);

    let sentCount = 0;
    socketsMap.forEach((socket) => {
      if (socket.id !== excludeSocketId) {
        socket.emit(event, data);
        sentCount++;
      }
    });

    this.logger.debug(`✅ Broadcast sent to ${sentCount} clients (except ${excludeSocketId}): ${event}`);
  }

  /**
   * Broadcaster à tous les utilisateurs connectés
   */
  broadcastToAll(server: Server, event: string, data: any): void {
    server.emit(event, data);
    this.logger.debug(`Broadcast sent to all: ${event}`);
  }

  // ============= REQUÊTES D'INFORMATIONS =============

  /**
   * Vérifier si un utilisateur est connecté
   */
  isUserOnline(userId: number): boolean {
    return this.connectedUsers.has(userId);
  }

  /**
   * Obtenir tous les socketIds d'un utilisateur
   */
  getUserSockets(userId: number): string[] {
    return this.connectedUsers.get(userId) || [];
  }

  /**
   * Obtenir les informations utilisateur d'un socket
   */
  getUserFromSocket(socketId: string): { userId: number; userType: string } | undefined {
    return this.socketToUser.get(socketId);
  }

  /**
   * Obtenir la liste des IDs des utilisateurs en ligne
   */
  getOnlineUserIds(): number[] {
    return Array.from(this.connectedUsers.keys());
  }

  /**
   * Obtenir le nombre total d'utilisateurs connectés
   */
  getTotalConnectedUsers(): number {
    return this.connectedUsers.size;
  }

  /**
   * Obtenir le nombre total de connexions (sockets)
   */
  getTotalConnections(): number {
    let total = 0;
    this.connectedUsers.forEach((sockets) => {
      total += sockets.length;
    });
    return total;
  }

  /**
   * Obtenir les statistiques de connexion
   */
  getConnectionStats(): {
    totalUsers: number;
    totalConnections: number;
    averageConnectionsPerUser: number;
    onlineUserIds: number[];
  } {
    const totalUsers = this.getTotalConnectedUsers();
    const totalConnections = this.getTotalConnections();

    return {
      totalUsers,
      totalConnections,
      averageConnectionsPerUser: totalUsers > 0 ? totalConnections / totalUsers : 0,
      onlineUserIds: this.getOnlineUserIds(),
    };
  }

  // ============= GESTION DES ROOMS (GROUPES) =============

  /**
   * Obtenir le nom de la room pour un groupe
   */
  getGroupRoomName(groupId: number): string {
    return `group:${groupId}`;
  }

  /**
   * Envoyer un message à tous les membres d'un groupe (via room)
   */
  sendToGroupRoom(server: Server, groupId: number, event: string, data: any): void {
    const roomName = this.getGroupRoomName(groupId);
    server.to(roomName).emit(event, data);
    this.logger.debug(`Message sent to group ${groupId}: ${event}`);
  }

  // ============= UTILITAIRES =============

  /**
   * Nettoyer toutes les connexions (pour les tests ou le shutdown)
   */
  clearAllConnections(): void {
    this.connectedUsers.clear();
    this.userTypes.clear();
    this.socketToUser.clear();
    this.logger.log('All connections cleared');
  }

  /**
   * Obtenir un résumé des utilisateurs connectés par type
   */
  getUsersByType(): { students: number[]; admins: number[] } {
    const students: number[] = [];
    const admins: number[] = [];

    this.socketToUser.forEach((userInfo, socketId) => {
      if (userInfo.userType === 'STUDENT' && !students.includes(userInfo.userId)) {
        students.push(userInfo.userId);
      } else if (userInfo.userType === 'ADMIN' && !admins.includes(userInfo.userId)) {
        admins.push(userInfo.userId);
      }
    });

    return { students, admins };
  }
}
