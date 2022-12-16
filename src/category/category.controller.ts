import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdmAuthorization } from 'src/auth/decorators/adm.decorator';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Controller('category')
@ApiTags('Lista de Usuários')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthGuard(), AdmAuthorization)
  @ApiBearerAuth()
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoryService.create(createCategoryDto);
    } catch (err) {
      (err);
    }
  }

  @UseGuards(AuthGuard(), AdmAuthorization)
  @ApiBearerAuth()
  @Get()
  async findAll() {
    try {
      return await this.categoryService.findAll();
    } catch (err) {
     (err);
    }
  }

  @UseGuards(AuthGuard(), AdmAuthorization)
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.categoryService.findOne(id);
    } catch (err) {
      (err);
    }
  }

  @UseGuards(AuthGuard(), AdmAuthorization)
  @ApiBearerAuth()
  @Patch()
  async update(@Body() updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.categoryService.update(updateCategoryDto);
    } catch (err) {
      (err);
    }
  }

  @UseGuards(AuthGuard(), AdmAuthorization)
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.categoryService.remove(id);
    } catch (err) {
      (err);
    }
  }
}
