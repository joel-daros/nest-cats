import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import UserModel from '../database/models/user.model';

@Injectable()
export class UsersService {
  findAll() {
    return UserModel.query();
  }

  async findOne(id: string) {
    try {
      return await UserModel.query().findById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async create(user: Partial<UserModel>) {
    try {
      await UserModel.transaction(async trx => {
        // verificar se o usuário já existe antes de fazer o insert
        const existentUser = await UserModel.query(trx)
          .where('username', user.username)
          .first();

        if (!existentUser) {
          return UserModel.query()
            .allowGraph('books')
            .insertGraph(user);
        } else {
          throw new ConflictException(`User ${user.username} already exists`);
        }
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
