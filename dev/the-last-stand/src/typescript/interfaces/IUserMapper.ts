import { Schema, type } from '@colyseus/schema';

export class IUserMapper extends Schema {
  @type('string') _id?: string;
  @type('string') username?: string;
  @type('string') userNo?: string;
  @type('string') title?: string;
  @type('string') clientId: string = '';
}
