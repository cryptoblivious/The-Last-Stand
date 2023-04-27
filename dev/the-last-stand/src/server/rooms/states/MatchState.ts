import { Schema, type, MapSchema, ArraySchema, DataChange } from '@colyseus/schema';


export class GameEntityMapper extends Schema {
  @type('string') id: string = '';
  @type('string') gameEntityType: string = '';
  @type({map:'number'}) position: {x: number, y: number} = {x: 0, y: 0};
  @type('string') anim?: string = '';
  @type('string') direction?: string = '';
}
export class MatchState extends Schema {
  @type({ map: GameEntityMapper }) gem: MapSchema<GameEntityMapper> = new MapSchema<GameEntityMapper>();
  @type(['string']) playerIds: ArraySchema<string> = new ArraySchema<string>();
  @type({map: 'number'} ) damagePercentageMap: MapSchema<number> = new MapSchema<number>();

  

  updateSprite(playerId: string, x: number, y: number, direction?: string, anim?: string) {
    const player = this.gem.get(playerId);
    if (player) {
      player.position.x = x;
      player.position.y = y;
      player.direction = direction;
      player.anim = anim;
    }
  }
}
