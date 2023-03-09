// import { IExecutable } from '../../../typescript/interfaces/Iexecutable';
import GameEntity from '../GameEntity';
import GameComponent from './GameComponent';

// interface iJumper {
//     velocity: number;
//     maxJumpNumber: number;
//     jumpCount: number;
// }

export default class Jumper extends GameComponent
//  implements IExecutable
// , iJumper
 {
    velocity: number;
    maxJumpNumber: number;
    jumpCount: number;
    
    constructor(gameEntity : GameEntity, name: string = 'jumper', velocity: number = -260, maxJumpNumber: number = 2, jumpCount: number = 0) {
        super(name, gameEntity);
        this.velocity = velocity;
        this.maxJumpNumber = maxJumpNumber;
        this.jumpCount = jumpCount;
    }

    execute(): any {
        if (this.jumpCount < this.maxJumpNumber) {
            this.gameEntity.position.y += this.velocity;
            this.jumpCount++;
        }
    }

}