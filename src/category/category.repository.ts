import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryRepository {
  private dataToReturn = {
    commons: true, 
    amds: true, 
    users: {
      include: {
        commons: true,
      },
    },
  };
  constructor(private readonly prismaService: PrismaService) {}

  async createCategory(
    { name, title, description }: CreateCategoryDto,
    id: string,
  ): Promise<Category> {
    try {
      return await this.prismaService.category.create({
        data: {
          id: id,
          name: name,
          description: description,
          title: title,
        },
        include: this.dataToReturn,
      });
    } catch (err) {
      throw new Error( err.message);
    }
  }

  async updateCategory(updateData: UpdateCategoryDto): Promise<Category> {
    try {
      const commonsIds = updateData.commonsIds;
      const admsIds = updateData.admsIds;

      delete updateData.commonsIds;
      delete updateData.admsIds;

      return await this.prismaService.category.update({
        where: { id: updateData.id },
        data: {
          commons: {
            connect: commonsIds?.map((id) => ({ id: id })),
          },
          adms: {
            connect: admsIds?.map((id) => ({ id: id })),
          },
        },
        include: this.dataToReturn,
      });
    } catch (err) {
      throw new Error( err.message);
    }
  }

  async deleteCategory(id: string): Promise<Category> {
    try {
      return await this.prismaService.category.delete({
        where: { id: id },
        include: this.dataToReturn,
      });
    } catch (err) {
      console.log('rodou', err);
      throw new Error( err.message);
    }
  }

  async findCategoryById(id: string): Promise<Category> {
    try {
      return await this.prismaService.category.findUnique({
        where: { id: id },
        include: this.dataToReturn,
      });
    } catch (err) {
      throw new Error( err.message);
    }
  }

  async findAllCategorys(): Promise<Category[]> {
    try {
      return await this.prismaService.category.findMany({
        include: this.dataToReturn,
      });
    } catch (err) {
      throw new Error( err.message);
    }
  }
}
