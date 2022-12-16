import { UsersList } from 'src/UsersList/entities/UsersList.entity';
import { IUserEntity } from 'src/user/entities/user.entity';
import { CreateCategoryDto } from '../dto/createCategory.dto';

export class Category extends CreateCategoryDto {
  id: string;
  students: IUserEntity[];
  teachers: IUserEntity[];
  category: UsersList[];
}
