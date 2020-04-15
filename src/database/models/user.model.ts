import { Model } from 'objection';
import BooksModel from './books.model';
import BaseModel from './base.model';
import * as bcrypt from 'bcryptjs';

export default class UserModel extends BaseModel {
  static tableName = 'users';

  // static jsonSchema = {
  //   type: 'object',
  //   required: ['username', 'passwordHash'],

  //   properties: {
  //     id: { type: 'uuid' },
  //     username: { type: 'string', minLength: 1, maxLength: 10 },
  //     passwordHash: { type: 'string' },
  //     email: { type: 'email' },
  //   },
  // };

  username: string;
  passwordHash: string;
  email: string;

  static relationMappings = () => ({
    books: {
      relation: Model.HasManyRelation,
      modelClass: BooksModel,
      join: {
        from: 'users.id',
        to: 'books.userId',
      },
    },
  });

  async $beforeInsert() {
    super.$beforeInsert();
    this.passwordHash = await bcrypt.hash(this.passwordHash, 8);
  }

  async $beforeUpdate() {
    super.$beforeUpdate();
    if (this.passwordHash) {
      this.passwordHash = await bcrypt.hash(this.passwordHash, 8);
    }
  }
}
