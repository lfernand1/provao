import { Body, Controller, Get, Post } from '@nestjs/common';
import { Request, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IUserEntity } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { AdmAuthorization } from './decorators/adm.decorator';
import { userLogin } from './decorators/user.decorator';
import { UserLoginDto } from './dto/userLogin.dto';

@Controller('Authorization')
@ApiTags('Authorization')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: UserLoginDto) {
    try {
      return await this.authService.validateUser(data);
    } catch (error) {
     (error);
    }
  }

  @Get()
  @UseGuards(AuthGuard(), AdmAuthorization)
  @ApiBearerAuth()
  async getUser(@userLogin() user: IUserEntity) {
    return user;
  }
}
