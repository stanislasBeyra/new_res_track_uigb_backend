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
  @ApiOperation({ summary: 'Send a private or group message' })
  @ApiResponse({ status: 201, description: 'Message sent', type: Message })
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
  @ApiOperation({ summary: 'Get all user conversations' })
  @ApiResponse({ status: 200, description: 'List of conversations' })
  async getConversations(@Request() req): Promise<any[]> {
    return this.messagesService.getUserConversations(req.user.id, req.user.role);
  }

  @Get('conversation/:otherUserId/:otherUserType')
  @ApiOperation({ summary: 'Get a private conversation' })
  @ApiParam({ name: 'otherUserId', description: 'Other user ID' })
  @ApiParam({ name: 'otherUserType', description: 'Other user type (STUDENT/ADMIN)' })
  @ApiResponse({ status: 200, description: 'Conversation messages' })
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
  @ApiOperation({ summary: 'Mark a message as read' })
  @ApiParam({ name: 'id', description: 'Message ID' })
  @ApiResponse({ status: 200, description: 'Message marked as read' })
  async markAsRead(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<Message> {
    return this.messagesService.markAsRead(id, req.user.id, req.user.role);
  }

  @Patch('conversation/:otherUserId/:otherUserType/read')
  @ApiOperation({ summary: 'Mark all messages in a conversation as read' })
  @ApiParam({ name: 'otherUserId', description: 'Other user ID' })
  @ApiParam({ name: 'otherUserType', description: 'Other user type (STUDENT/ADMIN)' })
  @ApiResponse({ status: 200, description: 'Conversation marked as read' })
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
  @ApiOperation({ summary: 'Mark all messages in a group as read' })
  @ApiParam({ name: 'groupId', description: 'Group ID' })
  @ApiResponse({ status: 200, description: 'Group messages marked as read' })
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
  @ApiOperation({ summary: 'Create a group' })
  @ApiResponse({ status: 201, description: 'Group created', type: Group })
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
  @ApiOperation({ summary: 'Get user groups' })
  @ApiResponse({ status: 200, description: 'List of groups' })
  async getUserGroups(@Request() req): Promise<Group[]> {
    return this.messagesService.getUserGroups(req.user.id, req.user.role);
  }

  @Get('groups/:id')
  @ApiOperation({ summary: 'Get a group' })
  @ApiParam({ name: 'id', description: 'Group ID' })
  @ApiResponse({ status: 200, description: 'Group details', type: Group })
  async getGroup(@Param('id', ParseIntPipe) id: number): Promise<Group> {
    return this.messagesService.getGroup(id);
  }

  @Get('groups/:id/messages')
  @ApiOperation({ summary: 'Get group messages' })
  @ApiParam({ name: 'id', description: 'Group ID' })
  @ApiResponse({ status: 200, description: 'Group messages' })
  async getGroupMessages(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<Message[]> {
    return this.messagesService.getGroupMessages(id, req.user.id, req.user.role);
  }

  @Post('groups/:id/members')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add a member to a group' })
  @ApiParam({ name: 'id', description: 'Group ID' })
  @ApiResponse({ status: 201, description: 'Member added' })
  async addGroupMember(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddGroupMemberDto,
  ) {
    return this.messagesService.addGroupMember(id, dto);
  }

  @Delete('groups/:groupId/members/:userId/:userType')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a member from a group' })
  @ApiParam({ name: 'groupId', description: 'Group ID' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiParam({ name: 'userType', description: 'User type' })
  @ApiResponse({ status: 204, description: 'Member removed' })
  async removeGroupMember(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Param('userType') userType: string,
  ): Promise<void> {
    return this.messagesService.removeGroupMember(groupId, userId, userType as any);
  }

  @Delete('groups/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a group' })
  @ApiParam({ name: 'id', description: 'Group ID' })
  @ApiResponse({ status: 204, description: 'Group deleted' })
  async deleteGroup(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<void> {
    return this.messagesService.deleteGroup(id, req.user.id, req.user.role);
  }

  // ============= AMIS =============

  @Post('friends/request')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Send a friend request' })
  @ApiResponse({ status: 201, description: 'Friend request sent', type: Friend })
  async sendFriendRequest(
    @Body() dto: SendFriendRequestDto,
    @Request() req,
  ): Promise<Friend> {
    return this.messagesService.sendFriendRequest(req.user.id, dto);
  }

  @Patch('friends/:id/accept')
  @ApiOperation({ summary: 'Accept a friend request' })
  @ApiParam({ name: 'id', description: 'Request ID' })
  @ApiResponse({ status: 200, description: 'Friend request accepted', type: Friend })
  async acceptFriendRequest(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<Friend> {
    return this.messagesService.respondToFriendRequest(id, req.user.id, true);
  }

  @Patch('friends/:id/reject')
  @ApiOperation({ summary: 'Reject a friend request' })
  @ApiParam({ name: 'id', description: 'Request ID' })
  @ApiResponse({ status: 200, description: 'Friend request rejected', type: Friend })
  async rejectFriendRequest(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<Friend> {
    return this.messagesService.respondToFriendRequest(id, req.user.id, false);
  }

  @Get('friends')
  @ApiOperation({ summary: 'Get friends list' })
  @ApiResponse({ status: 200, description: 'List of friends' })
  async getFriends(@Request() req): Promise<Friend[]> {
    return this.messagesService.getFriends(req.user.id);
  }

  @Get('friends/pending')
  @ApiOperation({ summary: 'Get pending friend requests' })
  @ApiResponse({ status: 200, description: 'Pending requests' })
  async getPendingRequests(@Request() req): Promise<Friend[]> {
    return this.messagesService.getPendingRequests(req.user.id);
  }

  @Patch('friends/:id/block')
  @ApiOperation({ summary: 'Block a user' })
  @ApiParam({ name: 'id', description: 'Friend relationship ID' })
  @ApiResponse({ status: 200, description: 'User blocked', type: Friend })
  async blockUser(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<Friend> {
    return this.messagesService.blockUser(id, req.user.id);
  }

  @Delete('friends/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a friend' })
  @ApiParam({ name: 'id', description: 'Friend relationship ID' })
  @ApiResponse({ status: 204, description: 'Friend removed' })
  async removeFriend(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<void> {
    return this.messagesService.removeFriend(id, req.user.id);
  }

  // ============= ADMIN SPECIFIC =============

  @Get('admin/students')
  @ApiOperation({ summary: 'Get all students (Admin only - for starting conversations)' })
  @ApiResponse({ status: 200, description: 'List of students' })
  async getStudentsForAdmin(@Request() req): Promise<any[]> {
    return this.messagesService.getStudentsForAdmin(req.user.id, req.user.role);
  }
}
