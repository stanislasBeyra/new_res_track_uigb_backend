import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WebsocketService } from './websocket.service';

@WebSocketGateway({
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://campustrack-lake.vercel.app']
      : ['http://localhost:3000', 'http://192.168.100.5:3000'],
    credentials: true,
  },
  namespace: '/chat',
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(WebsocketGateway.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly websocketService: WebsocketService,
  ) {}

  async handleConnection(client: Socket) {
    this.logger.log(`🔌 New connection attempt - Client ID: ${client.id}`);
    this.logger.debug(`🔍 Handshake auth:`, JSON.stringify(client.handshake.auth));
    this.logger.debug(`🔍 Handshake headers:`, JSON.stringify(client.handshake.headers));

    try {
      // Extraire le token JWT
      const token = client.handshake.auth?.token || client.handshake.headers?.authorization?.split(' ')[1];

      if (!token) {
        this.logger.warn(`❌ Client ${client.id} rejected: No token provided`);
        client.disconnect();
        return;
      }

      this.logger.debug(`🔑 Token found for client ${client.id}`);

      // Vérifier le token
      const payload = this.jwtService.verify(token);
      const userId = payload.sub;
      const userType = payload.role;

      this.logger.log(`✅ Token verified - User ID: ${userId}, Type: ${userType}`);

      // Attacher les infos au socket
      client.data.userId = userId;
      client.data.userType = userType;

      this.logger.debug(`📎 Data attached to socket ${client.id}`);

      // Enregistrer la connexion dans le service
      this.websocketService.registerConnection(client.id, userId, userType);

      this.logger.debug(`✅ Connection registered in service`);

      // Envoyer confirmation
      client.emit('connected', {
        message: 'Connected to chat',
        userId,
        userType,
        stats: this.websocketService.getConnectionStats(),
      });

      this.logger.log(`📨 Connection confirmation sent to client ${client.id}`);

      // Notifier les autres que l'utilisateur est en ligne
      this.logger.debug(`📢 Broadcasting user:online event`);
      this.websocketService.broadcastExcept(
        this.server,
        client.id,
        'user:online',
        { userId, userType }
      );

      this.logger.log(`✅ User ${userId} (${userType}) successfully connected with socket ${client.id}`);
    } catch (error) {
      this.logger.error(`❌ Connection error for client ${client.id}:`);
      this.logger.error(`Error message: ${error.message}`);
      this.logger.error(`Error stack: ${error.stack}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`🔌 Disconnect - Client ID: ${client.id}`);

    const disconnectInfo = this.websocketService.unregisterConnection(client.id);

    if (disconnectInfo) {
      this.logger.log(`👤 User ${disconnectInfo.userId} disconnected, last connection: ${disconnectInfo.isLastConnection}`);

      if (disconnectInfo.isLastConnection) {
        // Notifier que l'utilisateur est hors ligne (si c'était sa dernière connexion)
        this.logger.debug(`📢 Broadcasting user:offline event for user ${disconnectInfo.userId}`);
        this.websocketService.broadcastExcept(
          this.server,
          client.id,
          'user:offline',
          { userId: disconnectInfo.userId, userType: disconnectInfo.userType }
        );
      }
    } else {
      this.logger.warn(`⚠️ No disconnect info found for client ${client.id}`);
    }
  }

  // ============= MÉTHODES PUBLIQUES (appelées depuis d'autres services) =============

  /**
   * Envoyer un message à un utilisateur spécifique
   */
  sendMessageToUser(userId: number, event: string, data: any): boolean {
    return this.websocketService.sendToUser(this.server, userId, event, data);
  }

  /**
   * Envoyer un message à plusieurs utilisateurs (pour les groupes)
   */
  sendMessageToGroup(userIds: number[], event: string, data: any): void {
    this.websocketService.sendToMultipleUsers(this.server, userIds, event, data);
  }

  /**
   * Vérifier si un utilisateur est en ligne
   */
  isUserOnline(userId: number): boolean {
    return this.websocketService.isUserOnline(userId);
  }

  // ============= ÉVÉNEMENTS WEBSOCKET =============

  /**
   * Notifier qu'un utilisateur tape un message
   */
  @SubscribeMessage('message:typing')
  handleTyping(
    @MessageBody() data: { receiverId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data.userId;
    const userType = client.data.userType;

    this.websocketService.sendToUser(this.server, data.receiverId, 'message:typing', {
      senderId: userId,
      senderType: userType,
    });
  }

  /**
   * Notifier qu'un utilisateur a arrêté de taper
   */
  @SubscribeMessage('message:stop-typing')
  handleStopTyping(
    @MessageBody() data: { receiverId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data.userId;
    const userType = client.data.userType;

    this.websocketService.sendToUser(this.server, data.receiverId, 'message:stop-typing', {
      senderId: userId,
      senderType: userType,
    });
  }

  /**
   * Rejoindre une room de groupe
   */
  @SubscribeMessage('group:join')
  handleJoinGroup(
    @MessageBody() data: { groupId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const roomName = this.websocketService.getGroupRoomName(data.groupId);
    client.join(roomName);

    this.logger.log(`User ${client.data.userId} joined group ${data.groupId}`);

    // Notifier les autres membres du groupe
    this.websocketService.sendToGroupRoom(this.server, data.groupId, 'group:user-joined', {
      userId: client.data.userId,
      userType: client.data.userType,
      groupId: data.groupId,
    });

    return {
      event: 'group:joined',
      data: { groupId: data.groupId },
    };
  }

  /**
   * Quitter une room de groupe
   */
  @SubscribeMessage('group:leave')
  handleLeaveGroup(
    @MessageBody() data: { groupId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const roomName = this.websocketService.getGroupRoomName(data.groupId);
    client.leave(roomName);

    this.logger.log(`User ${client.data.userId} left group ${data.groupId}`);

    // Notifier les autres membres du groupe
    this.websocketService.sendToGroupRoom(this.server, data.groupId, 'group:user-left', {
      userId: client.data.userId,
      userType: client.data.userType,
      groupId: data.groupId,
    });

    return {
      event: 'group:left',
      data: { groupId: data.groupId },
    };
  }

  /**
   * Ping/Pong pour vérifier la connexion
   */
  @SubscribeMessage('ping')
  handlePing(client: Socket) {
    return {
      event: 'pong',
      data: {
        timestamp: new Date().toISOString(),
        userId: client.data.userId,
      },
    };
  }

  /**
   * Récupérer les utilisateurs en ligne
   */
  @SubscribeMessage('users:online')
  handleGetOnlineUsers() {
    return {
      event: 'users:online:list',
      data: {
        ...this.websocketService.getConnectionStats(),
        usersByType: this.websocketService.getUsersByType(),
      },
    };
  }

  /**
   * Vérifier si un utilisateur spécifique est en ligne
   */
  @SubscribeMessage('user:check-online')
  handleCheckUserOnline(@MessageBody() data: { userId: number }) {
    const isOnline = this.websocketService.isUserOnline(data.userId);

    return {
      event: 'user:online-status',
      data: {
        userId: data.userId,
        isOnline,
      },
    };
  }

  /**
   * Obtenir les statistiques de connexion
   */
  @SubscribeMessage('stats:connections')
  handleGetStats() {
    return {
      event: 'stats:connections',
      data: this.websocketService.getConnectionStats(),
    };
  }
}
