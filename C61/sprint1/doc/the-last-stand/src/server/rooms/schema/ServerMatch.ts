import { Schema, Context, type, MapSchema, ArraySchema } from '@colyseus/schema';
import GameEntity from "../../game/GameEntity";

export class ServerMatch extends Schema {



  @type({ array: GameEntity }) entities: ArraySchema<GameEntity> = new ArraySchema<GameEntity>();


}
