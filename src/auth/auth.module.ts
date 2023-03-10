import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { UserService } from 'src/user/services/user.service';
import { UserRepository } from 'src/user/user.repository';
import { JwtModule } from '@nestjs/jwt/dist';
import { DatabaseModule } from 'src/prisma/database.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '24h' },
    }),
    ConfigModule.forRoot(),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, UserRepository, AuthStrategy],
  exports: [AuthStrategy, AuthService],
})
export class AuthModule {}
