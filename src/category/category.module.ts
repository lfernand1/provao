import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { DatabaseModule } from 'src/prisma/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
