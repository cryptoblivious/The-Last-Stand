import { Schema, type, MapSchema, ArraySchema } from '@colyseus/schema';

export class UserMapper extends Schema {
  @type('string') username?: string = '';
  @type('string') userNo?: string = '';
  @type('string') clientId: string = '';
}

export class AppState extends Schema {
  @type({ map: UserMapper }) users: MapSchema<UserMapper> = new MapSchema<UserMapper>();
  @type({ array: 'string' }) messages: ArraySchema<IMessageMapper> = new ArraySchema<IMessageMapper>();
}
