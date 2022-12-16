import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { IUserEntity } from '../entities/user.entity';
import { UserDto } from './dto/userInput.dto';
import { randomUUID } from 'node:crypto';
import { PartialUserDto } from './dto/partialUserInput.dto';
import { UserRepository } from '../user.repository';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: UserDto): Promise<IUserEntity> {
    const userEntity: IUserEntity = { ...user, id: randomUUID() };
    if (user.password.length <= 5) {
      throw new Error(
        
        'Password invalid',
      );
    }
    const hPassword = await hash(user.password, 10);
    userEntity.password = hPassword;

    const createdUser = await this.userRepository.createUser(userEntity);
    delete createdUser.password;
    return createdUser;
  }

  async updateUser(userData: PartialUserDto): Promise<IUserEntity> {
    if (userData.password) {
      const hPassword = await hash(userData.password, 10);
      const userUpdate = { ...userData, password: hPassword };
      const updatedUser = await this.userRepository.updateUser(userUpdate);
      return updatedUser;
    }
    const updatedUser = await this.userRepository.updateUser(userData);
    delete updatedUser.password;
    return updatedUser;
  }

  async getAllUsers(): Promise<IUserEntity[]> {
    return await this.userRepository.findAllUsers();
  }

  async deleteUserById(userId: string): Promise<boolean> {
    try {
      await this.userRepository.deleteUser(userId);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async getUserById(userId: string): Promise<IUserEntity> {
    const foundUser = await this.userRepository.findUserById(userId);
    delete foundUser.password;
    return foundUser;
  }

  async findUserByEmail(email: string): Promise<IUserEntity> {
    const user = await this.userRepository.findUserById(email);
    return user;
  }
}
