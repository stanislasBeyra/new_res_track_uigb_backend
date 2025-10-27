import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { AddGroupMemberDto } from './dto/add-group-member.dto';
import { SendFriendRequestDto } from './dto/send-friend-request.dto';
import { Message } from './entities/message.entity';
import { Group } from './entities/goup.entity';
import { Friend } from './entities/friend.entity';

@ApiTags('Messages')
@ApiBearerAuth('JWT-auth')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // ============= MESSAGES =============

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Envoyer un message privé ou de groupe' })
  @ApiResponse({ status: 201, description: 'Message envoyé', type: Message })
  async sendMessage(
    @Body() createMessageDto: CreateMessageDto,
    @Request() req,
  ): Promise<Message> {
    return this.messagesService.sendMessage(
      createMessageDto,
      req.user.id,
      req.user.role,
    );
  }

  @Get('conversations')
  @ApiOperation({ summary: 'Récupérer toutes les conversations de l\'utilisateur' })
  @ApiResponse({ status: 200, description: 'Liste des conversations' })
  async getConversations(@Request() req): Promise<any[]> {
    return this.messagesService.getUserConversations(req.user.id, req.user.role);
  }

  @Get('conversation/:otherUserId/:otherUserType')
  @ApiOperation({ summary: 'Récupérer une conversation privée' })
  @ApiParam({ name: 'otherUserId', description: 'ID de l\'autre utilisateur' })
  @ApiParam({ name: 'otherUserType', description: 'Type de l\'autre utilisateur (STUDENT/ADMIN)' })
  @ApiResponse({ status: 200, description: 'Messages de la conversation' })
  async getConversation(
    @Param('otherUserId', ParseIntPipe) otherUserId: number,
    @Param('otherUserType') otherUserType: string,
    @Request() req,
  ): Promise<Message[]> {
    return this.messagesService.getConversation(
      req.user.id,
      req.user.role,
      otherUserId,
      otherUserType as any,
    );
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Marquer un message comme lu' })
  @ApiParam({ name: 'id', description: 'ID du message' })
  @ApiResponse({ status: 200, description: 'Message marqué comme lu' })
  async markAsRead(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<Message> {
    return this.messagesService.markAsRead(id, req.user.id, req.user.role);
  }

  @Patch('conversation/:otherUserId/:otherUserType/read')
  @ApiOperation({ summary: 'Marquer tous les messages d\'une conversation comme lus' })
  @ApiParam({ name: 'otherUserId', description: 'ID de l\'autre utilisateur' })
  @ApiParam({ name: 'otherUserType', description: 'Type de l\'autre utilisateur (STUDENT/ADMIN)' })
  @ApiResponse({ status: 200, description: 'Conversation marquée comme lue' })
  async markConversationAsRead(
    @Param('otherUserId', ParseIntPipe) otherUserId: number,
    @Param('otherUserType') otherUserType: string,
    @Request() req,
  ): Promise<{ success: boolean }> {
    await this.messagesService.markConversationAsRead(
      otherUserId,
      otherUserType as any,
      req.user.id,
      req.user.role,
    );
    return { success: true };
  }

  @Patch('groups/:groupId/read')
  @ApiOperation({ summary: 'Marquer tous les messages d\'un groupe comme lus' })
  @ApiParam({ name: 'groupId', description: 'ID du groupe' })
  @ApiResponse({ status: 200, description: 'Messages du groupe marqués comme lus' })
  async markGroupMessagesAsRead(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Request() req,
  ): Promise<{ success: boolean }> {
    await this.messagesService.markGroupMessagesAsRead(
      groupId,
      req.user.id,
      req.user.role,
    );
    return { success: true };
  }

  // ============= GROUPES =============

  @Post('groups')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Créer un groupe' })
  @ApiResponse({ status: 201, description: 'Groupe créé', type: Group })
  async createGroup(
    @Body() createGroupDto: CreateGroupDto,
    @Request() req,
  ): Promise<Group> {
    return this.messagesService.createGroup(
      createGroupDto,
      req.user.id,
      req.user.role,
    );
  }

  @Get('groups')
  @ApiOperation({ summary: 'Récupérer les groupes de l\'utilisateur' })
  @ApiResponse({ status: 200, description: 'Liste des groupes' })
  async getUserGroups(@Request() req): Promise<Group[]> {
    return this.messagesService.getUserGroups(req.user.id, req.user.role);
  }

  @Get('groups/:id')
  @ApiOperation({ summary: 'Récupérer un groupe' })
  @ApiParam({ name: 'id', description: 'ID du groupe' })
  @ApiResponse({ status: 200, description: 'Détails du groupe', type: Group })
  async getGroup(@Param('id', ParseIntPipe) id: number): Promise<Group> {
    return this.messagesService.getGroup(id);
  }

  @Get('groups/:id/messages')
  @ApiOperation({ summary: 'Récupérer les messages d\'un groupe' })
  @ApiParam({ name: 'id', description: 'ID du groupe' })
  @ApiResponse({ status: 200, description: 'Messages du groupe' })
  async getGroupMessages(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<Message[]> {
    return this.messagesService.getGroupMessages(id, req.user.id, req.user.role);
  }

  @Post('groups/:id/members')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Ajouter un membre à un groupe' })
  @ApiParam({ name: 'id', description: 'ID du groupe' })
  @ApiResponse({ status: 201, description: 'Membre ajouté' })
  async addGroupMember(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddGroupMemberDto,
  ) {
    return this.messagesService.addGroupMember(id, dto);
  }

  @Delete('groups/:groupId/members/:userId/:userType')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Retirer un membre d\'un groupe' })
  @ApiParam({ name: 'groupId', description: 'ID du groupe' })
  @ApiParam({ name: 'userId', description: 'ID de l\'utilisateur' })
  @ApiParam({ name: 'userType', description: 'Type d\'utilisateur' })
  @ApiResponse({ status: 204, description: 'Membre retiré' })
  async removeGroupMember(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Param('userType') userType: string,
  ): Promise<void> {
    return this.messagesService.removeGroupMember(groupId, userId, userType as any);
  }

  @Delete('groups/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer un groupe' })
  @ApiParam({ name: 'id', description: 'ID du groupe' })
  @ApiResponse({ status: 204, description: 'Groupe supprimé' })
  async deleteGroup(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<void> {
    return this.messagesService.deleteGroup(id, req.user.id, req.user.role);
  }

  // ============= AMIS =============

  @Post('friends/request')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Envoyer une demande d\'ami' })
  @ApiResponse({ status: 201, description: 'Demande envoyée', type: Friend })
  async sendFriendRequest(
    @Body() dto: SendFriendRequestDto,
    @Request() req,
  ): Promise<Friend> {
    return this.messagesService.sendFriendRequest(req.user.id, dto);
  }

  @Patch('friends/:id/accept')
  @ApiOperation({ summary: 'Accepter une demande d\'ami' })
  @ApiParam({ name: 'id', description: 'ID de la demande' })
  @ApiResponse({ status: 200, description: 'Demande acceptée', type: Friend })
  async acceptFriendRequest(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<Friend> {
    return this.messagesService.respondToFriendRequest(id, req.user.id, true);
  }

  @Patch('friends/:id/reject')
  @ApiOperation({ summary: 'Rejeter une demande d\'ami' })
  @ApiParam({ name: 'id', description: 'ID de la demande' })
  @ApiResponse({ status: 200, description: 'Demande rejetée', type: Friend })
  async rejectFriendRequest(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<Friend> {
    return this.messagesService.respondToFriendRequest(id, req.user.id, false);
  }

  @Get('friends')
  @ApiOperation({ summary: 'Récupérer la liste des amis' })
  @ApiResponse({ status: 200, description: 'Liste des amis' })
  async getFriends(@Request() req): Promise<Friend[]> {
    return this.messagesService.getFriends(req.user.id);
  }

  @Get('friends/pending')
  @ApiOperation({ summary: 'Récupérer les demandes d\'ami en attente' })
  @ApiResponse({ status: 200, description: 'Demandes en attente' })
  async getPendingRequests(@Request() req): Promise<Friend[]> {
    return this.messagesService.getPendingRequests(req.user.id);
  }

  @Patch('friends/:id/block')
  @ApiOperation({ summary: 'Bloquer un utilisateur' })
  @ApiParam({ name: 'id', description: 'ID de la relation ami' })
  @ApiResponse({ status: 200, description: 'Utilisateur bloqué', type: Friend })
  async blockUser(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<Friend> {
    return this.messagesService.blockUser(id, req.user.id);
  }

  @Delete('friends/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer un ami' })
  @ApiParam({ name: 'id', description: 'ID de la relation ami' })
  @ApiResponse({ status: 204, description: 'Ami supprimé' })
  async removeFriend(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<void> {
    return this.messagesService.removeFriend(id, req.user.id);
  }
}
