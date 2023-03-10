import  GameComponent  from './game_components/GameComponent';
import { Schema } from '@colyseus/schema';
import { type } from '@colyseus/schema';
export default class GameEntity extends Schema{
    @type('number') id: number;
    @type('string') name: string;
    @type({map: 'number'}) position: { x: number, y: number };
    @type({map: 'number'}) size : { width: number, height: number };
    @type({map: GameComponent}) components: Map<string, GameComponent>;

    constructor(id: number, name: string, position: { x: number, y: number }, size: { width: number, height: number }) {
        super();
        this.id = id;
        this.name = name;
        this.position = position;
        this.size = size;
        this.components = new Map();
    }

    addComponent(name: string, component: GameComponent) {
        this.components.set(name, component);
    }

    removeComponent(name: string) {
        this.components.delete(name);
    }
}
