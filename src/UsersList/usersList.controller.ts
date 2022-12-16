import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IUserEntity } from 'src/user/entities/user.entity';
import { AdmAuthorization } from 'src/auth/decorators/adm.decorator';
import { userLogin } from 'src/auth/decorators/user.decorator';
import { UsersListService } from './usersList.service';
import { CreateUsersListDto } from './dto/createUserslist.dto';
import { RegisterUsersListDto } from './dto/registerUserslist.dto';
import { UpdateUsersListDto } from './dto/updateUserslist.dto';

@Controller('Userslist')
@ApiTags('Lista de usuários')
export class usersListController {
  constructor(private readonly UsersListService: UsersListService) {}

  @UseGuards(AuthGuard(), AdmAuthorization)
  @ApiBearerAuth()
  @Post()
  create(@Body() createUsersListDto: CreateUsersListDto) {
    return this.UsersListService.create(createUsersListDto);
  }

  @UseGuards(AuthGuard(), AdmAuthorization)
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.UsersListService.findOne(id);
    } catch (err) {
    }
  }


  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post('registerUsersList')
  async registerUsersList(
    @userLogin() userLogin: IUserEntity,
    @Body() { usersListId }: RegisterUsersListDto,
  ) {
    try {
      return await this.UsersListService.RegisterUsersList(
        usersListId,
        userLogin.id,
      );
    } catch (error) {
    }
  }

  @UseGuards(AuthGuard(), AdmAuthorization)
  @ApiBearerAuth()
  @Get()
  async findAll() {
    try {
      return await this.UsersListService.findAll();
    } catch (err) {
    }
  }

  @UseGuards(AuthGuard(), AdmAuthorization)
  @ApiBearerAuth()
  @Patch(':id')
  async update(@Body() updateUsersListDto: UpdateUsersListDto) {
    try {
      return await this.UsersListService.update(updateUsersListDto);
    } catch (err) {
    }
  }
}
