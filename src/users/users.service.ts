import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRole } from '../enum/userrole';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      if (!createUserDto) {
        throw new BadRequestException('the data is required');
      }

      // Validation de l'email
      if (createUserDto.email) {
        const email = createUserDto.email;
        if (!email.endsWith('@student.iugb.edu.ci')) {
          throw new BadRequestException('this email address is not valid');
        }

        const emailExists = await this.userRepository.findOne({
          where: { email: createUserDto.email }
        });
        if (emailExists) {
          throw new BadRequestException('the email already exists');
        }
      }

      if (createUserDto.roomNumber) {
        const romm = createUserDto.roomNumber;
        if (romm.length > 3) {
          throw new BadRequestException('the room number must be less than 20 characters');
        }
      }

      // Validation du studentId
      if (createUserDto.studentId) {
        const studentIdExists = await this.userRepository.findOne({
          where: { studentId: createUserDto.studentId }
        });
        if (studentIdExists) {
          throw new BadRequestException('the student id already exists');
        }
      }

      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error while creating the user');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find({
        order: { createdAt: 'DESC' }
      });
    } catch (error) {
      throw new BadRequestException('Error while retrieving the users');
    }
  }

  async findOne(id?: number, studentId?: string, email?: string): Promise<User> {
    try {
      // Vérifier qu'au moins un paramètre est fourni
      if (!id && !studentId && !email) {
        throw new BadRequestException('At least one search parameter is required (id, studentId, or email)');
      }

      // Construire la condition de recherche
      const whereCondition: any = {};

      if (id) {
        whereCondition.id = id;
      }
      if (studentId) {
        whereCondition.studentId = studentId;
      }
      if (email) {
        whereCondition.email = email;
      }

      const user = await this.userRepository.findOne({ where: whereCondition });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error while retrieving the user');
    }
  }

  async uploadProfilePicture(id: number, file: Express.Multer.File): Promise<User> {
    try {
      if (!id) {
        throw new BadRequestException('User ID is required');
      }
      if (!file) {
        throw new BadRequestException('Profile picture file is required');
      }

      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Le fichier est déjà sauvegardé par multer dans public/upload
      // On stocke le chemin complet de l'image
      user.profilePicture = `upload/${file.filename}`;

      return await this.userRepository.save(user);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error while uploading the profile picture');
    }
  }

  async updateProfilePictureUrl(id: number, profilePictureUrl: string): Promise<User> {
    try {
      if (!id) {
        throw new BadRequestException('User ID is required');
      }
      if (!profilePictureUrl) {
        throw new BadRequestException('Profile picture URL is required');
      }

      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      user.profilePicture = profilePictureUrl;
      return await this.userRepository.save(user);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error while updating the profile picture URL');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      if (!id) {
        throw new BadRequestException('User ID is required');
      }

      // Vérifier que l'utilisateur existe
      const existingUser = await this.userRepository.findOne({ where: { id } });
      if (!existingUser) {
        throw new NotFoundException('User not found');
      }

      // Validation de l'email si fourni
      if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
        if (!updateUserDto.email.endsWith('@student.iugb.edu.ci')) {
          throw new BadRequestException('this email address is not valid');
        }

        const emailExists = await this.userRepository.findOne({
          where: { email: updateUserDto.email }
        });
        if (emailExists) {
          throw new BadRequestException('the email already exists');
        }
      }

      // Validation du studentId si fourni
      if (updateUserDto.studentId && updateUserDto.studentId !== existingUser.studentId) {
        const studentIdExists = await this.userRepository.findOne({
          where: { studentId: updateUserDto.studentId }
        });
        if (studentIdExists) {
          throw new BadRequestException('the student id already exists');
        }
      }

      await this.userRepository.update(id, updateUserDto);
      return await this.findOne(id);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error while updating the user');
    }
  }

  async activedesactiveUser(id: number): Promise<User> {
    try {
      if (!id) {
        throw new BadRequestException('User ID is required');
      }

      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      user.isActive = !user.isActive;
      return await this.userRepository.save(user);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error while updating user status');
    }
  }

  async changePassword(id: number, newPassword: string): Promise<User> {
    try {
      if (!id) {
        throw new BadRequestException('User ID is required');
      }
      if (!newPassword) {
        throw new BadRequestException('New password is required');
      }

      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      user.password = newPassword; // Le hashage doit être géré ailleurs (ex: un subscriber)
      return await this.userRepository.save(user);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error while changing the password');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      if (!id) {
        throw new BadRequestException('User ID is required');
      }

      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.userRepository.delete(id);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error while deleting the user');
    }
  }

  async findByRole(role: UserRole): Promise<User[]> {
    try {
      return await this.userRepository.find({
        where: { role },
        order: { createdAt: 'DESC' }
      });
    } catch (error) {
      throw new BadRequestException('Error while retrieving users by role');
    }
  }
}
