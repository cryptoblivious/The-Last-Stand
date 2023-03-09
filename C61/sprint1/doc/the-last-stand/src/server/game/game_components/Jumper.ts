import { IExecutable } from '../../../typescript/interfaces/Iexecutable';
import GameComponent from './GameComponent';

interface iJumper {
    velocity: number;
    maxJumpNumber: number;
    jumpCount: number;
}

export default class Jumper extends GameComponent implements IExecutable, iJumper {
    velocity: number;
    maxJumpNumber: number;
    jumpCount: number;

    constructor(name: string = 'jumper', velocity: number = -260, maxJumpNumber: number = 2, jumpCount: number = 0) {
        super(name);
        this.velocity = velocity;
        this.maxJumpNumber = maxJumpNumber;
        this.jumpCount = jumpCount;
    }

    execute(): any {
        return {
            name: this.name,
            velocity: this.velocity,
            jumpCount: this.jumpCount += 1
        }
    }

}