import { Model, StaticHookArguments } from 'objection';
import { v4 as uuidv4 } from 'uuid';

export default class Base extends Model {
  id!: string;
  createdAt: string;
  updatedAt: string;

  $beforeInsert() {
    this.id = uuidv4();
    this.createdAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}
