import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  Ip,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Se connecter avec email et mot de passe' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Body() loginDto: LoginDto,
    @Ip() ipAddress: string,
    @Req() req: Request,
  ): Promise<AuthResponseDto> {
    const userAgent = req.headers['user-agent'];
    return this.authService.login(loginDto, ipAddress, userAgent);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rafraîchir le token d\'accès' })
  @ApiResponse({
    status: 200,
    description: 'Token refreshed successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid or expired refresh token' })
  async refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Ip() ipAddress: string,
    @Req() req: Request,
  ): Promise<AuthResponseDto> {
    const userAgent = req.headers['user-agent'];
    return this.authService.refreshAccessToken(
      refreshTokenDto.refreshToken,
      ipAddress,
      userAgent,
    );
  }

  @Public()
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Se déconnecter et révoquer le refresh token' })
  @ApiResponse({ status: 204, description: 'Logout successful' })
  async logout(@Body() refreshTokenDto: RefreshTokenDto): Promise<void> {
    return this.authService.logout(refreshTokenDto.refreshToken);
  }
}
