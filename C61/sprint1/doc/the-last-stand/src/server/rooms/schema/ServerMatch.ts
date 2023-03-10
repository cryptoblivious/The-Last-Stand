import { Schema, Context, type, MapSchema, ArraySchema } from '@colyseus/schema';
import GameEntity from "../../game/GameEntity";

export class ServerMatch extends Schema {

  @type({ map: GameEntity }) entities: MapSchema<GameEntity> = new MapSchema<GameEntity>();

}
