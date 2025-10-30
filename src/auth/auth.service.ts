import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(
    loginDto: LoginDto,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<AuthResponseDto> {
    // Trouver l'utilisateur avec tous les champs nécessaires (y compris password pour la vérification)
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
      select: [
        'id', 
        'email', 
        'password', 
        'firstName', 
        'lastName', 
        'role', 
        'isActive',
        'profilePicture',
        'phone',
        'studentId',
        'level',
        'roomNumber',
        'status',
        'createdAt',
        'updatedAt',
        'lastLogin',
      ],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is inactive. Please contact administrator.');
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Générer les tokens
    const tokens = await this.generateTokens(user, ipAddress, userAgent);

    // Mettre à jour lastLogin
    await this.userRepository.update(user.id, { lastLogin: new Date() });

    // Exclure le mot de passe et les champs sensibles du retour
    const { password, deletedAt, ...userWithoutPassword } = user;
    // Mettre à jour lastLogin dans l'objet retourné
    userWithoutPassword.lastLogin = new Date();

    return {
      ...tokens,
      user: userWithoutPassword,
    };
  }

  async refreshAccessToken(
    refreshTokenString: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<AuthResponseDto> {
    // Vérifier le refresh token
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { token: refreshTokenString, isRevoked: false },
      relations: ['user'],
    });

    if (!refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Vérifier si le token est expiré
    if (new Date() > refreshToken.expiresAt) {
      throw new UnauthorizedException('Refresh token expired');
    }

    // Révoquer l'ancien refresh token
    await this.refreshTokenRepository.update(refreshToken.id, {
      isRevoked: true,
    });

    // Récupérer l'utilisateur complet pour retourner tous les champs
    const fullUser = await this.userRepository.findOne({
      where: { id: refreshToken.user.id },
    });

    if (!fullUser) {
      throw new UnauthorizedException('User not found');
    }

    // Générer de nouveaux tokens
    const tokens = await this.generateTokens(
      fullUser,
      ipAddress,
      userAgent,
    );

    // Exclure le mot de passe et les champs sensibles
    const { password, deletedAt, ...userWithoutPassword } = fullUser;

    return {
      ...tokens,
      user: userWithoutPassword,
    };
  }

  async logout(refreshTokenString: string): Promise<void> {
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { token: refreshTokenString },
    });

    if (refreshToken) {
      await this.refreshTokenRepository.update(refreshToken.id, {
        isRevoked: true,
      });
    }
  }

  async revokeUserTokens(userId: number): Promise<void> {
    await this.refreshTokenRepository.update(
      { userId, isRevoked: false },
      { isRevoked: true },
    );
  }

  private async generateTokens(
    user: User,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
  }> {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    // Générer access token (courte durée - 1 heure)
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '30d',
    });

    // Générer refresh token (longue durée - 7 jours)
    const refreshTokenPayload = {
      sub: user.id,
      type: 'refresh',
    };

    const refreshToken = this.jwtService.sign(refreshTokenPayload, {
      expiresIn: '270d', // 9 mois (270 jours)
    });

    // Sauvegarder le refresh token en base de données
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 270); // 9 mois

    await this.refreshTokenRepository.save({
      token: refreshToken,
      userId: user.id,
      expiresAt,
      ipAddress,
      userAgent,
    });

    return {
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
      expiresIn: 3600, // 1 heure en secondes (access token)
    };
  }

  async validateUser(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId, isActive: true },
    });

    if (!user) {
      throw new UnauthorizedException('User not found or inactive');
    }

    return user;
  }
}
