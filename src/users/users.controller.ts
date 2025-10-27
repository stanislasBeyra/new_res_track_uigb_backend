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
  @ApiOperation({ summary: 'Créer un nouvel utilisateur (inscription)' })
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès', type: User })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 409, description: 'Email ou studentId déjà existant' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les utilisateurs (requiert authentification)' })
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs', type: [User] })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Public()
  @Get(':param')
  @ApiOperation({ summary: 'Récupérer un utilisateur par ID, email ou studentId' })
  @ApiParam({ name: 'param', description: 'ID (nombre), email ou studentId', type: 'string' })
  @ApiResponse({ status: 200, description: 'Utilisateur trouvé', type: User })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
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
  @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
  @ApiParam({ name: 'id', description: 'ID de l\'utilisateur', type: 'number' })
  @ApiResponse({ status: 200, description: 'Utilisateur mis à jour', type: User })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 409, description: 'Email ou studentId déjà existant' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  @ApiParam({ name: 'id', description: 'ID de l\'utilisateur', type: 'number' })
  @ApiResponse({ status: 204, description: 'Utilisateur supprimé' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.remove(id);
  }

  @Patch(':id/profile-picture')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @ApiOperation({ summary: 'Uploader une photo de profil' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'Fichier image (JPG, JPEG, PNG, GIF - Max 5MB)', type: UploadFileDto })
  @ApiParam({ name: 'id', description: 'ID de l\'utilisateur', type: 'number' })
  @ApiResponse({ status: 200, description: 'Photo de profil uploadée', type: User })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  @ApiResponse({ status: 400, description: 'Fichier invalide ou manquant' })
  async uploadProfilePicture(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<User> {
    return this.usersService.uploadProfilePicture(id, file);
  }
}
