import {
  Body,
  Post,
  Delete,
  Get,
  Patch,
  Controller,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDto } from './services/dto/userInput.dto';
import { UserService } from './services/user.service';
import { Response } from 'express';
import { AdmAuthorization } from 'src/auth/decorators/adm.decorator';
import { userLogin } from 'src/auth/decorators/user.decorator';
import { IUserEntity } from './entities/user.entity';
import { PartialUserDto } from './services/dto/partialUserInput.dto';


@Controller('user')
@ApiTags('Users')
export default class UsersController {
  constructor(private readonly service: UserService) {}

  @UseGuards(AuthGuard(), AdmAuthorization)
  @ApiBearerAuth()
  @Get(':id')
  async getUserById(@Param('id') userId: string): Promise<IUserEntity> {
    try {
      return await this.service.getUserById(userId);
    } catch (err) {
      
    }
  }

  @UseGuards(AuthGuard(), AdmAuthorization)
  @ApiBearerAuth()
  @Get()
  async getAllUser(): Promise<IUserEntity[]> {
    return await this.service.getAllUsers();
  }
  

  @Post()
  async createUser(
    @Body() { email, password, name }: UserDto,
    @Res() response: Response,
  ) {
    try {
      const result = await this.service.createUser({
        email,
        password,
        name
      });

      response.status(201).send(result);
    } catch (err) {
      
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete(':id')
  async deleteUserById(@Param('id') userId: string): Promise<string> {
    const userIsDeleted = await this.service.deleteUserById(userId);
    console.log(userIsDeleted);
    if (userIsDeleted) {
      return 'User deleted';
    } else {
      return 'Not found';
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch()
  async updateUser(
    @Body() userData: PartialUserDto,
    @userLogin() user: IUserEntity,
  ): Promise<IUserEntity> {
    try {
      if (userData.id) {
        delete userData.id;
      }
      const dataToUpdate = { ...userData, id: user.id };
      return await this.service.updateUser(dataToUpdate);
    } catch (err) {
    
    }
  }

}
