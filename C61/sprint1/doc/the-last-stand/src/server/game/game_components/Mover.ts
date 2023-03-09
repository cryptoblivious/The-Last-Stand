import GameComponent from "./GameComponent";

export default class Mover extends GameComponent {
    constructor(name: string = 'mover', velocity: number = 160) {
        super(name);
    }

   execute(): void {
        console.log('Mover executed');
   }

}