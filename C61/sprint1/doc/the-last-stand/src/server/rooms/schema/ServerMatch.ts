import { Schema, Context, type, MapSchema } from "@colyseus/schema";

export class ServerMatch extends Schema {

  @type("string") mySynchronizedProperty: string = "Hello world";

  @type({ map: "string" }) mySynchronizedMap = new MapSchema<string>();
}
