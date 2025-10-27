import { Injectable, NotFoundException, BadRequestException, ForbiddenException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { AddGroupMemberDto } from './dto/add-group-member.dto';
import { SendFriendRequestDto } from './dto/send-friend-request.dto';
import { Message, SenderType, ReceiverType } from './entities/message.entity';
import { Group } from './entities/goup.entity';
import { GroupMember } from './entities/group_member.entity';
import { Friend, FriendStatus } from './entities/friend.entity';
import { User } from '../users/entities/user.entity';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { FcmTokensService } from '../fcm-tokens/fcm-tokens.service';
import { FcmService } from '../fcm-tokens/fcm.service';

@Injectable()
export class MessagesService {
  private readonly logger = new Logger(MessagesService.name);

  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(GroupMember)
    private readonly groupMemberRepository: Repository<GroupMember>,
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly websocketGateway: WebsocketGateway,
    private readonly fcmTokensService: FcmTokensService,
    private readonly fcmService: FcmService,
  ) {}

  // ============= MESSAGES =============

  async sendMessage(
    createMessageDto: CreateMessageDto,
    senderId: number,
    senderType: SenderType,
  ): Promise<Message> {
    this.logger.log(`📨 Tentative d'envoi de message: Émetteur ${senderId} (${senderType})`);
    this.logger.debug(`📝 Contenu du DTO: ${JSON.stringify(createMessageDto)}`);
    
    // Validation: message privé OU groupe, pas les deux
    if (createMessageDto.groupId && createMessageDto.receiverId) {
      this.logger.warn(`❌ Tentative d'envoi à la fois privé et de groupe`);
      throw new BadRequestException('Un message ne peut pas être à la fois privé et de groupe');
    }

    if (!createMessageDto.groupId && !createMessageDto.receiverId) {
      this.logger.warn(`❌ Aucun destinataire spécifié`);
      throw new BadRequestException('Vous devez spécifier soit un destinataire, soit un groupe');
    }

    // Si receiverId est fourni mais pas receiverType, le récupérer automatiquement
    if (createMessageDto.receiverId && !createMessageDto.receiverType) {
      this.logger.debug(`🔍 Récupération automatique du type pour l'utilisateur ${createMessageDto.receiverId}`);
      
      const receiver = await this.userRepository.findOne({
        where: { id: createMessageDto.receiverId },
        select: ['id', 'role'],
      });

      if (!receiver) {
        this.logger.warn(`❌ Destinataire non trouvé: ID ${createMessageDto.receiverId}`);
        throw new NotFoundException('Destinataire non trouvé');
      }

      // Convertir le role en ReceiverType
      createMessageDto.receiverType = receiver.role as unknown as ReceiverType;
      this.logger.debug(`✅ Type récupéré automatiquement: ${createMessageDto.receiverType}`);
    }

    // Si message de groupe, vérifier que l'utilisateur est membre
    if (createMessageDto.groupId) {
      this.logger.debug(`👥 Vérification de l'appartenance au groupe ${createMessageDto.groupId}`);
      
      const isMember = await this.groupMemberRepository.findOne({
        where: {
          groupId: createMessageDto.groupId,
          userId: senderId,
          userType: senderType,
        },
      });

      if (!isMember) {
        this.logger.warn(`⛔ Utilisateur ${senderId} n'est pas membre du groupe ${createMessageDto.groupId}`);
        throw new ForbiddenException('Vous n\'êtes pas membre de ce groupe');
      }
      
      this.logger.debug(`✅ Membre du groupe vérifié`);
    }

    // Si message privé, vérifier la relation d'amitié (seulement pour les étudiants)
    if (createMessageDto.receiverId && senderType === SenderType.STUDENT) {
      this.logger.debug(`🔍 Message privé vers utilisateur ${createMessageDto.receiverId}, type: ${createMessageDto.receiverType}`);
      
      // Vérifier qu'on ne s'envoie pas un message à soi-même (autorisé)
      if (senderId !== createMessageDto.receiverId) {
        this.logger.debug(`👥 Vérification de la relation d'amitié entre ${senderId} et ${createMessageDto.receiverId}`);
        
        // Vérifier si les deux utilisateurs sont amis
        const friendship = await this.friendRepository
          .createQueryBuilder('friend')
          .where(
            '((friend.requesterId = :senderId AND friend.studentId = :receiverId) OR ' +
            '(friend.requesterId = :receiverId AND friend.studentId = :senderId)) AND ' +
            'friend.status = :status',
            {
              senderId,
              receiverId: createMessageDto.receiverId,
              status: FriendStatus.ACCEPTED,
            }
          )
          .getOne();

        if (!friendship) {
          this.logger.warn(`❌ Pas de relation d'amitié entre ${senderId} et ${createMessageDto.receiverId}`);
          throw new ForbiddenException(
            'Vous ne pouvez envoyer des messages qu\'à vos amis. Envoyez d\'abord une demande d\'ami.'
          );
        }
        
        this.logger.debug(`✅ Relation d'amitié vérifiée (ID: ${friendship.id})`);

        // Vérifier que la relation n'est pas bloquée
        if (friendship.status === FriendStatus.BLOCKED) {
          this.logger.warn(`🚫 Relation bloquée entre ${senderId} et ${createMessageDto.receiverId}`);
          throw new ForbiddenException('Impossible d\'envoyer un message à cet utilisateur');
        }
      } else {
        this.logger.debug(`📝 Message à soi-même autorisé`);
      }
    } else if (createMessageDto.receiverId && senderType !== SenderType.STUDENT) {
      this.logger.debug(`👮 Message de ${senderType} vers ${createMessageDto.receiverId} - Pas de vérification d'amitié`);
    }

    const message = this.messageRepository.create({
      ...createMessageDto,
      senderId,
      senderType,
    });

    const savedMessage = await this.messageRepository.save(message);
    this.logger.log(`💾 Message sauvegardé: ID ${savedMessage.id}`);

    // Récupérer les infos de l'émetteur pour la notification
    const sender = await this.userRepository.findOne({
      where: { id: senderId },
      select: ['id', 'firstName', 'lastName'],
    });
    const senderName = sender ? `${sender.firstName} ${sender.lastName}` : 'Un utilisateur';

    // Envoyer en temps réel via WebSocket ET notification push
    if (savedMessage.groupId) {
      // Message de groupe
      this.logger.debug(`📢 Envoi du message au groupe ${savedMessage.groupId}`);
      const members = await this.groupMemberRepository.find({
        where: { groupId: savedMessage.groupId },
      });
      const memberIds = members.map(m => m.userId).filter(id => id !== senderId);
      this.logger.debug(`👥 ${memberIds.length} membre(s) à notifier: ${memberIds.join(', ')}`);
      
      // WebSocket
      this.logger.log(`🚀 ENVOI WEBSOCKET GROUPE: Message ${savedMessage.id} vers ${memberIds.length} membres du groupe ${savedMessage.groupId}`);
      this.websocketGateway.sendMessageToGroup(memberIds, 'message:new', savedMessage);
      this.logger.log(`📡 Message envoyé aux membres: ${memberIds.join(', ')}`);
      
      // Notification push pour les membres du groupe
      this.sendPushNotificationToUsers(
        memberIds,
        senderName,
        savedMessage.messageContent,
        'group',
        savedMessage.groupId.toString()
      );
    } else if (savedMessage.receiverId) {
      // Message privé
      this.logger.debug(`📤 Envoi du message privé à l'utilisateur ${savedMessage.receiverId}`);
      
      // WebSocket
      this.logger.log(`🚀 ENVOI WEBSOCKET: Message ${savedMessage.id} vers utilisateur ${savedMessage.receiverId}`);
      const sent = this.websocketGateway.sendMessageToUser(savedMessage.receiverId, 'message:new', savedMessage);
      this.logger.log(`📡 Résultat envoi WebSocket: ${sent ? 'SUCCÈS' : 'ÉCHEC'} (utilisateur ${savedMessage.receiverId} ${sent ? 'connecté' : 'déconnecté'})`);
      
      // Notification push pour le destinataire
      this.sendPushNotificationToUsers(
        [savedMessage.receiverId],
        senderName,
        savedMessage.messageContent,
        'private',
        senderId.toString()
      );
    }

    this.logger.log(`✅ Message envoyé avec succès: ID ${savedMessage.id} de ${senderId} vers ${savedMessage.groupId ? 'groupe ' + savedMessage.groupId : 'utilisateur ' + savedMessage.receiverId}`);
    
    return savedMessage;
  }

  async getConversation(
    userId: number,
    userType: SenderType,
    otherUserId: number,
    otherUserType: SenderType,
  ): Promise<Message[]> {
    this.logger.debug(`💬 Récupération de la conversation entre ${userId} et ${otherUserId}`);
    
    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('message.receiver', 'receiver')
      .where(
        '((message.senderId = :userId AND message.senderType = :userType AND message.receiverId = :otherUserId AND message.receiverType = :otherUserType) OR ' +
        '(message.senderId = :otherUserId AND message.senderType = :otherUserType AND message.receiverId = :userId AND message.receiverType = :userType))',
        { userId, userType, otherUserId, otherUserType }
      )
      .orderBy('message.sentAt', 'ASC')
      .getMany();
    
    this.logger.log(`📨 ${messages.length} message(s) dans la conversation`);
    
    return messages;
  }

  async getGroupMessages(groupId: number, userId: number, userType: SenderType): Promise<Message[]> {
    this.logger.debug(`👥 Récupération des messages du groupe ${groupId} pour l'utilisateur ${userId}`);
    
    // Vérifier que l'utilisateur est membre du groupe
    const isMember = await this.groupMemberRepository.findOne({
      where: { groupId, userId, userType },
    });

    if (!isMember) {
      this.logger.warn(`⛔ Utilisateur ${userId} n'est pas membre du groupe ${groupId}`);
      throw new ForbiddenException('Vous n\'êtes pas membre de ce groupe');
    }

    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('message.group', 'group')
      .where('message.groupId = :groupId', { groupId })
      .orderBy('message.sentAt', 'ASC')
      .getMany();
    
    this.logger.log(`📨 ${messages.length} message(s) dans le groupe ${groupId}`);
    
    return messages;
  }

  async getUserConversations(userId: number, userType: SenderType): Promise<any[]> {
    this.logger.debug(`📋 Récupération des conversations pour l'utilisateur ${userId} (${userType})`);
    
    // Récupérer tous les messages où l'utilisateur est impliqué avec les relations utilisateur
    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('message.receiver', 'receiver')
      .where('message.senderId = :userId AND message.senderType = :userType', { userId, userType })
      .orWhere('message.receiverId = :userId AND message.receiverType = :userType', { userId, userType })
      .orderBy('message.sentAt', 'DESC')
      .getMany();

    this.logger.debug(`📨 ${messages.length} message(s) trouvé(s)`);

    // Grouper par conversation
    const conversationsMap = new Map<string, any>();

    for (const message of messages) {
      let key: string;
      let otherUserId: number;
      let otherUserType: SenderType;
      let otherUser: User;

      if (message.senderId === userId && message.senderType === userType) {
        // Je suis l'émetteur, donc l'autre utilisateur est le destinataire
        otherUserId = message.receiverId;
        otherUserType = message.receiverType as unknown as SenderType;
        otherUser = message.receiver;
      } else {
        // Je suis le destinataire, donc l'autre utilisateur est l'émetteur
        otherUserId = message.senderId;
        otherUserType = message.senderType;
        otherUser = message.sender;
      }

      key = `${otherUserId}-${otherUserType}`;

      if (!conversationsMap.has(key)) {
        conversationsMap.set(key, {
          otherUserId,
          otherUserType,
          otherUser: otherUser ? {
            id: otherUser.id,
            firstName: otherUser.firstName,
            lastName: otherUser.lastName,
            fullName: `${otherUser.firstName} ${otherUser.lastName}`,
            email: otherUser.email,
            role: otherUser.role,
            profilePicture: otherUser.profilePicture,
            status: otherUser.status,
            studentId: otherUser.studentId,
            level: otherUser.level,
            roomNumber: otherUser.roomNumber,
          } : null,
          lastMessage: message,
          unreadCount: 0,
        });
        
        if (otherUser) {
          this.logger.debug(`✅ Conversation avec ${otherUser.firstName} ${otherUser.lastName}`);
        }
      }
    }

    // Calculer le nombre de messages non lus pour chaque conversation
    const conversations = Array.from(conversationsMap.values());
    
    for (const conversation of conversations) {
      const unreadCount = await this.messageRepository.count({
        where: {
          senderId: conversation.otherUserId,
          senderType: conversation.otherUserType,
          receiverId: userId,
          receiverType: userType as unknown as ReceiverType,
          isRead: false,
        },
      });
      
      conversation.unreadCount = unreadCount;
      
      if (unreadCount > 0) {
        this.logger.debug(`📬 ${unreadCount} message(s) non lu(s) avec ${conversation.otherUser?.firstName} ${conversation.otherUser?.lastName}`);
      }
    }

    this.logger.log(`💬 ${conversations.length} conversation(s) récupérée(s) pour l'utilisateur ${userId}`);

    return conversations;
  }

  async markAsRead(messageId: number, userId: number, userType: SenderType): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: { id: messageId },
    });

    if (!message) {
      throw new NotFoundException('Message non trouvé');
    }

    // Seul le destinataire peut marquer comme lu
    if (message.receiverId !== userId || message.receiverType !== (userType as unknown as ReceiverType)) {
      throw new ForbiddenException('Vous ne pouvez marquer que vos propres messages comme lus');
    }

    message.isRead = true;
    return await this.messageRepository.save(message);
  }

  async markConversationAsRead(otherUserId: number, otherUserType: SenderType, userId: number, userType: SenderType): Promise<void> {
    await this.messageRepository.update(
      {
        senderId: otherUserId,
        senderType: otherUserType,
        receiverId: userId,
        receiverType: userType as unknown as ReceiverType,
        isRead: false,
      },
      {
        isRead: true,
      }
    );
    
    this.logger.debug(`✅ Messages marqués comme lus pour la conversation avec ${otherUserId}`);
  }

  async markGroupMessagesAsRead(groupId: number, userId: number, userType: SenderType): Promise<void> {
    await this.messageRepository.update(
      {
        groupId: groupId,
        senderId: Not(userId), // Messages pas envoyés par l'utilisateur
        isRead: false,
      },
      {
        isRead: true,
      }
    );
    
    this.logger.debug(`✅ Messages marqués comme lus pour le groupe ${groupId}`);
  }

  // ============= GROUPES =============

  async createGroup(
    createGroupDto: CreateGroupDto,
    creatorId: number,
    creatorType: SenderType,
  ): Promise<Group> {
    const group = this.groupRepository.create({
      ...createGroupDto,
      createdBy: creatorId,
      creatorType,
    });

    const savedGroup = await this.groupRepository.save(group);

    // Ajouter le créateur comme membre
    await this.addGroupMember(savedGroup.id, {
      userId: creatorId,
      userType: creatorType,
    });

    return savedGroup;
  }

  async getGroup(groupId: number): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
      relations: ['members'],
    });

    if (!group) {
      throw new NotFoundException('Groupe non trouvé');
    }

    return group;
  }

  async getUserGroups(userId: number, userType: SenderType): Promise<Group[]> {
    const members = await this.groupMemberRepository.find({
      where: { userId, userType },
      relations: ['group', 'group.members'],
    });

    const groups = members.map(member => member.group);
    
    // Calculer le nombre de messages non lus pour chaque groupe
    for (const group of groups) {
      const unreadCount = await this.messageRepository.count({
        where: {
          groupId: group.id,
          senderId: Not(userId), // Messages pas envoyés par l'utilisateur
          isRead: false,
        },
      });
      
      // Ajouter la propriété unreadCount au groupe
      (group as any).unreadCount = unreadCount;
      
      if (unreadCount > 0) {
        this.logger.debug(`📬 ${unreadCount} message(s) non lu(s) dans le groupe ${group.groupName}`);
      }
    }

    return groups;
  }

  async addGroupMember(groupId: number, dto: AddGroupMemberDto): Promise<GroupMember> {
    // Vérifier si le groupe existe
    const group = await this.groupRepository.findOne({ where: { id: groupId } });
    if (!group) {
      throw new NotFoundException('Groupe non trouvé');
    }

    // Vérifier si l'utilisateur est déjà membre
    const existingMember = await this.groupMemberRepository.findOne({
      where: {
        groupId,
        userId: dto.userId,
        userType: dto.userType,
      },
    });

    if (existingMember) {
      throw new BadRequestException('Cet utilisateur est déjà membre du groupe');
    }

    const member = this.groupMemberRepository.create({
      groupId,
      ...dto,
    });

    return await this.groupMemberRepository.save(member);
  }

  async removeGroupMember(groupId: number, userId: number, userType: SenderType): Promise<void> {
    const member = await this.groupMemberRepository.findOne({
      where: { groupId, userId, userType },
    });

    if (!member) {
      throw new NotFoundException('Membre non trouvé dans ce groupe');
    }

    await this.groupMemberRepository.remove(member);
  }

  async deleteGroup(groupId: number, userId: number, userType: SenderType): Promise<void> {
    const group = await this.groupRepository.findOne({ where: { id: groupId } });

    if (!group) {
      throw new NotFoundException('Groupe non trouvé');
    }

    // Seul le créateur peut supprimer le groupe
    if (group.createdBy !== userId || group.creatorType !== userType) {
      throw new ForbiddenException('Seul le créateur peut supprimer ce groupe');
    }

    await this.groupRepository.remove(group);
  }

  // ============= AMIS =============

  async sendFriendRequest(requesterId: number, dto: SendFriendRequestDto): Promise<Friend> {
    this.logger.log(`📤 Tentative d'envoi de demande d'ami: Utilisateur ${requesterId} -> Utilisateur ${dto.studentId}`);
    
    // Vérifier qu'on ne s'ajoute pas soi-même
    if (requesterId === dto.studentId) {
      this.logger.warn(`❌ L'utilisateur ${requesterId} a tenté de s'ajouter lui-même`);
      throw new BadRequestException('Vous ne pouvez pas vous ajouter vous-même');
    }

    // Vérifier si une relation existe déjà
    const existingFriend = await this.friendRepository
      .createQueryBuilder('friend')
      .where(
        '((friend.requesterId = :requesterId AND friend.studentId = :studentId) OR ' +
        '(friend.requesterId = :studentId AND friend.studentId = :requesterId))',
        { requesterId, studentId: dto.studentId }
      )
      .getOne();

    if (existingFriend) {
      this.logger.debug(`🔍 Relation existante trouvée: ID ${existingFriend.id}, Status: ${existingFriend.status}`);
      
      // Si la demande a été rejetée, on peut renvoyer une nouvelle demande
      if (existingFriend.status === FriendStatus.REJECTED) {
        this.logger.log(`♻️ Suppression de l'ancienne demande rejetée (ID: ${existingFriend.id})`);
        await this.friendRepository.remove(existingFriend);
      } else if (existingFriend.status === FriendStatus.PENDING) {
        this.logger.warn(`⏳ Demande déjà en attente entre ${requesterId} et ${dto.studentId}`);
        throw new BadRequestException('Une demande d\'ami est déjà en attente avec cet utilisateur');
      } else if (existingFriend.status === FriendStatus.ACCEPTED) {
        this.logger.warn(`✅ Les utilisateurs ${requesterId} et ${dto.studentId} sont déjà amis`);
        throw new BadRequestException('Vous êtes déjà ami avec cet utilisateur');
      } else if (existingFriend.status === FriendStatus.BLOCKED) {
        this.logger.warn(`🚫 Tentative d'envoi à un utilisateur bloqué: ${dto.studentId}`);
        throw new BadRequestException('Cet utilisateur est bloqué');
      }
    } else {
      this.logger.debug(`✨ Aucune relation existante trouvée`);
    }

    const friendRequest = this.friendRepository.create({
      requesterId,
      studentId: dto.studentId,
      status: FriendStatus.PENDING,
    });

    const saved = await this.friendRepository.save(friendRequest);
    this.logger.log(`✅ Demande d'ami créée avec succès: ID ${saved.id}, de ${requesterId} vers ${dto.studentId}`);
    
    return saved;
  }

  async respondToFriendRequest(
    friendId: number,
    studentId: number,
    accept: boolean,
  ): Promise<Friend> {
    this.logger.log(`📩 Traitement demande d'ami: ID ${friendId}, Utilisateur ${studentId}, Action: ${accept ? 'ACCEPTER' : 'REJETER'}`);
    
    const friendRequest = await this.friendRepository.findOne({
      where: { id: friendId, studentId },
    });

    if (!friendRequest) {
      this.logger.warn(`❌ Demande d'ami non trouvée: ID ${friendId} pour utilisateur ${studentId}`);
      throw new NotFoundException('Demande d\'ami non trouvée');
    }

    if (friendRequest.status !== FriendStatus.PENDING) {
      this.logger.warn(`⚠️ Demande déjà traitée: ID ${friendId}, Status actuel: ${friendRequest.status}`);
      throw new BadRequestException('Cette demande a déjà été traitée');
    }

    friendRequest.status = accept ? FriendStatus.ACCEPTED : FriendStatus.REJECTED;
    const saved = await this.friendRepository.save(friendRequest);
    
    this.logger.log(`${accept ? '✅ Demande acceptée' : '❌ Demande rejetée'}: ID ${friendId}, entre ${friendRequest.requesterId} et ${studentId}`);
    
    return saved;
  }

  async getFriends(studentId: number): Promise<Friend[]> {
    this.logger.debug(`📋 Récupération de la liste d'amis pour l'utilisateur ${studentId}`);
    
    const friends = await this.friendRepository
      .createQueryBuilder('friend')
      .leftJoinAndSelect('friend.requester', 'requester')
      .leftJoinAndSelect('friend.student', 'student')
      .where(
        '((friend.requesterId = :studentId OR friend.studentId = :studentId) AND friend.status = :status)',
        { studentId, status: FriendStatus.ACCEPTED }
      )
      .getMany();
    
    this.logger.log(`👥 ${friends.length} ami(s) trouvé(s) pour l'utilisateur ${studentId}`);
    
    return friends;
  }

  async getPendingRequests(studentId: number): Promise<Friend[]> {
    this.logger.debug(`⏳ Récupération des demandes en attente pour l'utilisateur ${studentId}`);
    
    const requests = await this.friendRepository.find({
      where: {
        studentId,
        status: FriendStatus.PENDING,
      },
      relations: ['requester', 'student'],
    });
    
    this.logger.log(`📬 ${requests.length} demande(s) en attente pour l'utilisateur ${studentId}`);
    
    return requests;
  }

  async blockUser(friendId: number, studentId: number): Promise<Friend> {
    this.logger.log(`🚫 Tentative de blocage: Relation ID ${friendId} par utilisateur ${studentId}`);
    
    const friend = await this.friendRepository.findOne({
      where: { id: friendId },
    });

    if (!friend) {
      this.logger.warn(`❌ Relation non trouvée: ID ${friendId}`);
      throw new NotFoundException('Relation non trouvée');
    }

    // Vérifier que l'utilisateur est impliqué dans cette relation
    if (friend.requesterId !== studentId && friend.studentId !== studentId) {
      this.logger.warn(`⛔ Tentative de blocage non autorisée: Utilisateur ${studentId} sur relation ${friendId}`);
      throw new ForbiddenException('Vous ne pouvez pas bloquer cette relation');
    }

    friend.status = FriendStatus.BLOCKED;
    const saved = await this.friendRepository.save(friend);
    
    this.logger.log(`🚫 Utilisateur bloqué: Relation ID ${friendId}`);
    
    return saved;
  }

  async removeFriend(friendId: number, studentId: number): Promise<void> {
    this.logger.log(`🗑️ Tentative de suppression d'ami: Relation ID ${friendId} par utilisateur ${studentId}`);
    
    const friend = await this.friendRepository.findOne({
      where: { id: friendId },
    });

    if (!friend) {
      this.logger.warn(`❌ Ami non trouvé: ID ${friendId}`);
      throw new NotFoundException('Ami non trouvé');
    }

    // Vérifier que l'utilisateur est impliqué dans cette relation
    if (friend.requesterId !== studentId && friend.studentId !== studentId) {
      this.logger.warn(`⛔ Tentative de suppression non autorisée: Utilisateur ${studentId} sur relation ${friendId}`);
      throw new ForbiddenException('Vous ne pouvez pas supprimer cette relation');
    }

    await this.friendRepository.remove(friend);
    
    this.logger.log(`✅ Ami supprimé: Relation ID ${friendId}, entre ${friend.requesterId} et ${friend.studentId}`);
  }

  // ============= NOTIFICATIONS PUSH =============

  /**
   * Envoyer une notification push aux utilisateurs
   * @param userIds - Liste des IDs des utilisateurs à notifier
   * @param senderName - Nom de l'émetteur
   * @param messageContent - Contenu du message
   * @param type - Type de notification ('private', 'group', ou 'exit')
   * @param referenceId - ID de référence (userId, groupId, ou exitId)
   */
  async sendPushNotificationToUsers(
    userIds: number[],
    senderName: string,
    messageContent: string,
    type: 'private' | 'group' | 'exit',
    referenceId: string,
  ): Promise<void> {
    if (userIds.length === 0) {
      return;
    }

    try {
      this.logger.debug(`🔔 Envoi de notification push à ${userIds.length} utilisateur(s)`);
      
      // Récupérer tous les tokens des utilisateurs
      const tokens = await this.fcmTokensService.getTokensByUserIds(userIds);
      
      if (tokens.length === 0) {
        this.logger.warn(`⚠️ Aucun token trouvé pour les utilisateurs: ${userIds.join(', ')}`);
        return;
      }

      this.logger.debug(`📱 ${tokens.length} token(s) trouvé(s)`);

      // Préparer la notification
      const notification = {
        title: senderName,
        body: messageContent.length > 100 
          ? messageContent.substring(0, 100) + '...' 
          : messageContent,
        data: {
          type: type,
          referenceId: referenceId,
          timestamp: new Date().toISOString(),
        },
      };

      // Envoyer la notification à tous les tokens
      const response = await this.fcmService.sendToMultipleTokens(tokens, notification);
      
      this.logger.log(
        `✅ Notification push envoyée: ${response.successCount} réussie(s), ${response.failureCount} échouée(s)`
      );
    } catch (error) {
      // Ne pas bloquer l'envoi du message si la notification échoue
      this.logger.error(`❌ Erreur lors de l'envoi de la notification push:`, error);
    }
  }
}
