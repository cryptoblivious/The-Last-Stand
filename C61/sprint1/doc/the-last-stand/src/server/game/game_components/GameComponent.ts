import { type, Schema } from '@colyseus/schema';

export default class GameComponent extends Schema {
    execute() {
      throw new Error("Method not implemented.");
    }
    @type('string') name: string;
    constructor(name: string) {
        super();
        this.name = name;
    }
}