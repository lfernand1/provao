import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUserEntity } from './entities/user.entity';
import { PartialUserDto } from './services/dto/partialUserInput.dto';

@Injectable()
export class UserRepository {
  findUserByEmail(email: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly prisma: PrismaService) {}

  async createUser(user: IUserEntity): Promise<IUserEntity> {
    try {
      const CreatedUser = await this.prisma.user.create({ data: user });
      return CreatedUser;
    } catch (err) {
      
    }
  }

  async deleteUser(id: string): Promise<IUserEntity> {
    try {
      const deletedUser = await this.prisma.user.delete({
        where: { id: id },
      });
      return deletedUser;
    } catch (err) {
    }
  }

  async updateUser(user: PartialUserDto): Promise<IUserEntity> {
    try {
      const UpdatedUser = await this.prisma.user.update({
        where: { id: user.id },
        data: user,
      });
      return UpdatedUser;
    } catch (err) {
    }
  }

  async findUserById(id: string): Promise<IUserEntity> {
    try {
      const foundUser = await this.prisma.user.findUniqueOrThrow({
        where: { id: id },
      });

      return foundUser;
    } catch (err) {
     
    }
  }

  async findAllUsers(): Promise<IUserEntity[]> {
    try {
      const allUsers = await this.prisma.user.findMany();
      return allUsers;
    } catch (err) {
      
    }
  }

 
}
