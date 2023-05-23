import { Schema, type, MapSchema } from '@colyseus/schema';
import { CUserMapper } from '../../../typescript/classes/CUserMapper';

export class AppState extends Schema {
  @type({ map: CUserMapper }) users: MapSchema<CUserMapper> = new MapSchema<CUserMapper>();
}
