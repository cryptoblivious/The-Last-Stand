import {Schema, type, MapSchema} from '@colyseus/schema';

export class GameLobbyState extends Schema {
  @type({ map: 'string' }) players = new MapSchema<string>();
}