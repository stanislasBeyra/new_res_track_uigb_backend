import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { multerConfig } from '../config/multer.config';
import { Public } from '../common/decorators/public.decorator';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UploadFileDto } from './dto/upload-file.dto';
import { User } from './entities/user.entity';

@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user (registration)' })
  @ApiResponse({ status: 201, description: 'User created successfully', type: User })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 409, description: 'Email or studentId already exists' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users (requires authentication)' })
  @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Public()
  @Get(':param')
  @ApiOperation({ summary: 'Get a user by ID, email or studentId' })
  @ApiParam({ name: 'param', description: 'ID (number), email or studentId', type: 'string' })
  @ApiResponse({ status: 200, description: 'User found', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('param') param: string): Promise<User> {
    const id = parseInt(param);

    if (!isNaN(id) && id > 0) {
      return this.usersService.findOne(id);
    } else if (param.includes('@')) {
      return this.usersService.findOne(undefined, undefined, param);
    } else {
      return this.usersService.findOne(undefined, param);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', description: 'User ID', type: 'number' })
  @ApiResponse({ status: 200, description: 'User updated', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 409, description: 'Email or studentId already exists' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', description: 'User ID', type: 'number' })
  @ApiResponse({ status: 204, description: 'User deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.remove(id);
  }

  @Patch(':id/profile-picture')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @ApiOperation({ summary: 'Upload profile picture' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'Image file (JPG, JPEG, PNG, GIF - Max 5MB)', type: UploadFileDto })
  @ApiParam({ name: 'id', description: 'User ID', type: 'number' })
  @ApiResponse({ status: 200, description: 'Profile picture uploaded', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Invalid or missing file' })
  async uploadProfilePicture(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<User> {
    return this.usersService.uploadProfilePicture(id, file);
  }
}
