import { type, Schema } from '@colyseus/schema';
import GameEntity from '../GameEntity';

export default class GameComponent extends Schema {
    execute(data?: any) {
      throw new Error("Method not implemented.");
    }
    @type('string') name: string;
    gameEntity: GameEntity;

    constructor(name: string, gameEntity : GameEntity) {
        super();
        this.name = name;
        this.gameEntity = gameEntity;
    }
}