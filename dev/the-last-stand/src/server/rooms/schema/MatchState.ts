import { Schema, Context, type, MapSchema, ArraySchema } from '@colyseus/schema';
import GameEntity from '../../game/GameEntity';

export class Position extends Schema {
  @type('number') x: number = 0;
  @type('number') y: number = 0;
}
export class GameEntityMapper extends Schema {
  @type('string') id: string = '';
  @type('string') gameEntityType: string = '';
  @type(Position) position: Position = new Position();
}
export class MatchState extends Schema {
  @type({ map: GameEntityMapper }) gem: MapSchema<GameEntityMapper> = new MapSchema<GameEntityMapper>();

  movePlayer(playerId: string, x: number, y: number) {
    const player = this.gem.get(playerId);
    if (player) {
      player.position.x = x;
      player.position.y = y;
    }
  }
}