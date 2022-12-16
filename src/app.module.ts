import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';

import { CategoryModule } from './category/category.module';
import { DatabaseModule } from './prisma/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    CategoryModule,
  ],
})
export class AppModule {}
