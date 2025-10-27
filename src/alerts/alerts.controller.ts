import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AlertsService, EmergencyAlertData } from './alerts.service';

@Controller('alerts')
@UseGuards(JwtAuthGuard)
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  /**
   * Envoyer une alerte d'urgence à tous les étudiants
   */
  @Post('emergency/students')
  async sendEmergencyAlertToStudents(@Body() alertData: EmergencyAlertData) {
    try {
      const result = await this.alertsService.sendEmergencyAlertToStudents(alertData);
      
      return {
        success: result.success,
        message: result.success 
          ? `Alerte envoyée avec succès à ${result.studentsNotified} étudiant(s)`
          : 'Erreur lors de l\'envoi de l\'alerte',
        data: {
          studentsNotified: result.studentsNotified,
          pushNotificationsSent: result.pushNotificationsSent,
          errors: result.errors
        }
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Erreur interne du serveur',
        error: error.message
      };
    }
  }

  /**
   * Envoyer une alerte d'urgence à tous les utilisateurs
   */
  @Post('emergency/all')
  async sendEmergencyAlertToAll(@Body() alertData: EmergencyAlertData) {
    try {
      const result = await this.alertsService.sendEmergencyAlertToAll(alertData);
      
      return {
        success: result.success,
        message: result.success 
          ? `Alerte envoyée avec succès à ${result.usersNotified} utilisateur(s)`
          : 'Erreur lors de l\'envoi de l\'alerte',
        data: {
          usersNotified: result.usersNotified,
          pushNotificationsSent: result.pushNotificationsSent,
          errors: result.errors
        }
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Erreur interne du serveur',
        error: error.message
      };
    }
  }

  /**
   * Obtenir les statistiques des alertes
   */
  @Get('stats')
  async getAlertStats() {
    try {
      const stats = await this.alertsService.getAlertStats();
      
      return {
        success: true,
        message: 'Statistiques récupérées avec succès',
        data: stats
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Erreur lors de la récupération des statistiques',
        error: error.message
      };
    }
  }
}
