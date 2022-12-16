import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/services/user.service';
import { UserLoginDto } from './dto/userLogin.dto';
import { IUserEntity } from 'src/user/entities/user.entity';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: UserLoginDto) {
    const user = await this.userService.findUserByEmail(email);

    const passwordOk = await compare(password, user.password);
    if (!passwordOk) {
      throw new Error('Invalid password! Try Again');
    }

    delete user.password;

    return {
      token: this.jwtService.sign({
        email: user.email,
        id: user.id,
        name: user.name,
      }),
      user,
    };
  }

  async getUser(email: string): Promise<IUserEntity> {
    const userMail = await this.userService.findUserByEmail(email);
    return userMail;
  }
}
