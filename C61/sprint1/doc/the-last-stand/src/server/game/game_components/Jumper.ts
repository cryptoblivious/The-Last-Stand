import { IExecutable } from '../../../typescript/interfaces/Iexecutable';

interface iJumper {
    velocity : number;
    maxJumpNumber: number;
    jumpCount : number;
}

export default class Jumper implements IExecutable, iJumper{
    velocity : number;
    maxJumpNumber: number;
    jumpCount : number;

    constructor(velocity : number = 260, maxJumpNumber: number = 2, jumpCount : number = 0){
        this.velocity = velocity;
        this.maxJumpNumber = maxJumpNumber;
        this.jumpCount = jumpCount;
    }

    execute(): any {
        return this.velocity -= 260, this.jumpCount += 1;
    }
        
}