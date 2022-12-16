import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CategoryService } from 'src/category/category.service';
import { UsersListRespository } from './usersList.repository';
import { CreateUsersListDto } from './dto/createusersList.dto';
import { UpdateUsersListDto } from './dto/updateusersList.dto';
import { UsersList } from './entities/usersList.entity';

@Injectable()
export class UsersListService {
  RegisterUsersList(usersListId: string, id: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private readonly categoryService: CategoryService,
    private readonly usersListRepository: UsersListRespository,
  ) {}

  async create(
    createUsersListDto: CreateUsersListDto,
  ): Promise<UsersList> {
    await this.categoryService.findOne(createUsersListDto.categoryId);

    const Today = new Date(Date.now()).toISOString().slice(0, 10);
    const formated =
      Today.slice(8, 10) + '/' + Today.slice(5, 7) + '/' + Today.slice(0, 4);

    const EndDateToUsers = 10 * 60 * 1000;
    const UsersToday: UsersList = {
      ...createUsersListDto,
      id: randomUUID(),
      startDate: new Date(Date.now()),
      endDate: new Date(Date.now() + EndDateToUsers),
      commons: [],

    };

    return await this.usersListRepository.createUsersList(
      UsersToday,
    );
  }

  async findAll() {
    return await this.usersListRepository.allUserssLists();
  }

  async findOne(id: string): Promise<UsersList> {
    const findedUsersList =
      await this.usersListRepository.UsersListById(id);
    return findedUsersList;
  }

  async update(updateUsersListDto: UpdateUsersListDto) {
    return await this.usersListRepository.updateUsersList(
      updateUsersListDto,
    );
  }

}
