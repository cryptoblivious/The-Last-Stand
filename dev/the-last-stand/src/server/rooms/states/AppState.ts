import { Schema, type, MapSchema } from '@colyseus/schema';
import { IUserMapper } from '../../../typescript/interfaces/IUserMapper';

export class AppState extends Schema {
  @type({ map: IUserMapper }) users: MapSchema<IUserMapper> = new MapSchema<IUserMapper>();
}
