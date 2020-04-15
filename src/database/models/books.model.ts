import { Model } from 'objection';
import UserModel from './user.model';
import BaseModel from './base.model';

export default class BooksModel extends BaseModel {
  static tableName = 'books';
  bookName: string;
  userId: number;

  static relationMappings = () => ({
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: 'books.userId',
        to: 'users.id'
      }
    }
  });
}
