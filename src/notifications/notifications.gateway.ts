import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../enum/userrole';

@WebSocketGateway({
  cors: {
    origin: '*', // À configurer selon votre frontend
    credentials: true,
  },
  namespace: '/notifications',
})
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(NotificationsGateway.name);
  private connectedUsers: Map<number, string[]> = new Map(); // userId -> socketIds[]
  private adminSockets: Set<string> = new Set(); // socketIds des admins

  constructor(private readonly jwtService: JwtService) {}

  async handleConnection(client: Socket) {
    try {
      // Extraire le token JWT du handshake
      const token = client.handshake.auth?.token || client.handshake.headers?.authorization?.split(' ')[1];

      if (!token) {
        this.logger.warn(`Client ${client.id} rejected: No token provided`);
        client.disconnect();
        return;
      }

      // Vérifier le token
      const payload = this.jwtService.verify(token);
      const userId = payload.sub;
      const userRole = payload.role;

      // Attacher les infos user au socket
      client.data.userId = userId;
      client.data.userRole = userRole;

      // Ajouter à la map des utilisateurs connectés
      const userSockets = this.connectedUsers.get(userId) || [];
      userSockets.push(client.id);
      this.connectedUsers.set(userId, userSockets);

      // Si c'est un admin, l'ajouter au Set des admins
      if (userRole === UserRole.ADMIN) {
        this.adminSockets.add(client.id);
        this.logger.log(`Admin connected: ${client.id} (User ID: ${userId})`);
      } else {
        this.logger.log(`User connected: ${client.id} (User ID: ${userId})`);
      }

      // Envoyer confirmation de connexion
      client.emit('connected', {
        message: 'Connected to notifications',
        userId,
        role: userRole,
      });
    } catch (error) {
      this.logger.error(`Connection error for client ${client.id}:`, error.message);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.data.userId;
    const userRole = client.data.userRole;

    if (userId) {
      // Retirer du map des utilisateurs connectés
      const userSockets = this.connectedUsers.get(userId) || [];
      const filteredSockets = userSockets.filter((id) => id !== client.id);

      if (filteredSockets.length > 0) {
        this.connectedUsers.set(userId, filteredSockets);
      } else {
        this.connectedUsers.delete(userId);
      }

      // Si c'était un admin, le retirer du Set
      if (userRole === UserRole.ADMIN) {
        this.adminSockets.delete(client.id);
        this.logger.log(`Admin disconnected: ${client.id}`);
      } else {
        this.logger.log(`User disconnected: ${client.id}`);
      }
    }
  }

  // Envoyer une notification à tous les admins
  notifyAdmins(event: string, data: any) {
    this.adminSockets.forEach((socketId) => {
      this.server.to(socketId).emit(event, data);
    });
    this.logger.log(`Notification sent to ${this.adminSockets.size} admin(s): ${event}`);
  }

  // Envoyer une notification à un utilisateur spécifique
  notifyUser(userId: number, event: string, data: any) {
    const userSockets = this.connectedUsers.get(userId);
    if (userSockets) {
      userSockets.forEach((socketId) => {
        this.server.to(socketId).emit(event, data);
      });
      this.logger.log(`Notification sent to user ${userId}: ${event}`);
    }
  }

  // Broadcaster à tous les utilisateurs connectés
  broadcast(event: string, data: any) {
    this.server.emit(event, data);
    this.logger.log(`Broadcast sent: ${event}`);
  }

  @SubscribeMessage('ping')
  handlePing(client: Socket) {
    return { event: 'pong', data: { timestamp: new Date().toISOString() } };
  }
}
