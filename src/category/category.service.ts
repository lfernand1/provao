import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const id = randomUUID();
    return await this.categoryRepository.createCategory(
      createCategoryDto,
      id,
    );
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.findAllCategorys();
  }

  async findOne(id: string): Promise<Category> {
    return await this.categoryRepository.findCategoryById(id);
  }

  async update(updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    if (!updateCategoryDto.commonsIds && !updateCategoryDto.admsIds) {
      throw new Error(
        'no reference to connection',
      );
    }

    return await this.categoryRepository.updateCategory(updateCategoryDto);
  }

  async remove(id: string): Promise<string> {
    await this.categoryRepository.deleteCategory(id);
    return 'Category deleted';
  }
}
