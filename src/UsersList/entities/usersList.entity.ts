import { IUserEntity } from 'src/user/entities/user.entity';
import { CreateUsersListDto } from '../dto/createUsersList.dto';

export class UsersList extends CreateUsersListDto {
  id: string;
  startDate: Date;
  endDate: Date;
  commons: IUserEntity[];
}
