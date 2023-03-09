import { Schema, Context, type, MapSchema } from "@colyseus/schema";
import GameEntity from "../../game/GameEntity";

export class ServerMatch extends Schema {

  // @type("string") mySynchronizedProperty: string = "Hello world";

  // @type({ map: "string" }) mySynchronizedMap = new MapSchema<string>();

  @type({ map: GameEntity }) entities: MapSchema<GameEntity> = new MapSchema<GameEntity>();


}
