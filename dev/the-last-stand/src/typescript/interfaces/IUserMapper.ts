import { Schema, type } from '@colyseus/schema';

export class IUserMapper extends Schema {
  @type('string') username?: string = '';
  @type('string') userNo?: string = '';
  @type('string') clientId: string = '';
}
