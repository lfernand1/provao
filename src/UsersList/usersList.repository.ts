import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUsersListDto } from './dto/updateUsersList.dto';
import { UsersList } from './entities/Userslist.entity';

@Injectable()
export class UsersListRespository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUsersList({
    categoryId,
    endDate,
    id,
    startDate,
    commons,
  }: UsersList): Promise<UsersList> {
    return await this.prismaService.UsersList.create({
      data: {
        endDate: endDate,
        id: id,
        startDate: startDate,
        categoryId: categoryId,
      },
      include: {
        commons: true,
      },
    });
  }

  async updateUsersList({
    id,
    commonsIds,
  }: UpdateUsersListDto): Promise<UsersList> {
    try {
      return await this.prismaService.UsersList.update({
        where: { id: id },
        data: {
          commons: {
            connect: commonsIds.map((id) => {
              return { id: id };
            }),
          },
        },
        include: {
          commons: true,
        },
      });
    } catch (err) {
      
    }
  }

  async allUserssLists(): Promise<UsersList[]> {
    return await this.prismaService.UsersList.findMany({
      include: { commons: true },
    });
  }

  async UsersListById(id: string): Promise<UsersList> {
    return await this.prismaService.UsersList.findUniqueOrThrow({
      where: { id: id },
      include: {
        commons: true,
      },
    });
  }
}
