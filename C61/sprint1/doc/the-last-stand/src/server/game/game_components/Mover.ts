import GameComponent from "./GameComponent";
import GameEntity from '../GameEntity';

export default class Mover extends GameComponent {
    velocity: number;

    constructor( gameEntity: GameEntity, name: string = 'mover', velocity: number = 5) {
        super(name, gameEntity);
        this.velocity = velocity;
    }

   execute(direction : number): void {
        if (direction === 1){
            console.log("Moving left")
            this.gameEntity.position.x -= this.velocity;
        }
        else if (direction === 2){
            console.log("Moving down")
            this.gameEntity.position.y += this.velocity;
        }
        else{
            console.log("Moving right")
            this.gameEntity.position.x += this.velocity;
        }
   }

}