import { Schema, Context, type, MapSchema, ArraySchema } from '@colyseus/schema';
import GameEntity from '../../game/GameEntity';

export class GameEntityMapper extends Schema {
  @type('string') id: string = '';
  @type('string') gameEntityType: string = '';
  @type({ map: 'number' }) position: { x: number; y: number } = { x: 0, y: 0 };
}
export class MatchState extends Schema {
  @type({ map: GameEntityMapper }) gem: MapSchema<any> = new MapSchema<any>();
}
