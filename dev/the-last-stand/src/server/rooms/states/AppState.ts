import { Schema, type, MapSchema } from '@colyseus/schema';

export class UserMapper extends Schema {
  @type('string') username: string = '';
  @type('string') userNo: string = '';
}
export class AppState extends Schema {
  @type({ map: UserMapper }) users: MapSchema<UserMapper> = new MapSchema<UserMapper>();
}
