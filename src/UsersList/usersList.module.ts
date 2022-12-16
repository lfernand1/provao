import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { usersListController } from './usersList.controller';
import { CategoryService } from 'src/category/category.service';
import { UsersListRespository } from './usersList.repository';
import { DatabaseModule } from 'src/prisma/database.module';
import { CategoryRepository } from 'src/category/category.repository';
import { UserRepository } from 'src/user/user.repository';
import { UsersListService } from './usersList.service';


@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [usersListController],
  providers: [
    UsersListService,
    UsersListRespository,
    CategoryService,
    CategoryRepository,
    UserRepository,
  ],
})
export class UsersListModule {}
