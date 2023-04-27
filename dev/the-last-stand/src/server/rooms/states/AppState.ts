import { Schema, type, MapSchema, ArraySchema } from '@colyseus/schema';

export class UserMapper extends Schema {
  @type('string') username?: string = '';
  @type('string') userNo?: string = '';
  @type('string') clientId: string = '';
}

export class MessageMapper extends Schema {
  @type('string') username?: string = '';
  @type('string') message?: string = '';
  @type('string') time?: string = '';
}

export class AppState extends Schema {
  @type({ map: UserMapper }) users: MapSchema<UserMapper> = new MapSchema<UserMapper>();
  @type({ array: 'string' }) messages: ArraySchema<MessageMapper> = new ArraySchema<MessageMapper>();
}
