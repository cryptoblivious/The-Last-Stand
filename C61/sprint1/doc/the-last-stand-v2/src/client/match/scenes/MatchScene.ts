import Phaser from "phaser";
import type Server from '../services/Server';
import IMatchState from '../../../types/IMatchState';

export default class MatchScene extends Phaser.Scene {
    constructor() {
        super("game");
    }

    init() {

    }

    preload() {

    }

    async create(data: { server: Server }) {
        //game recieves server instance from bootstrap scene
        const { server } = data
        server.join()

        server.onceStateChanged(this.createBoard, this)
    }

    update() {

    }

    private createBoard(state : IMatchState)
    {
        let x = 100
        let y = 100
        state.board.forEach((cellState, index) => {
            this.add.rectangle(x,y,64,64,0xffffff)
            x += 64 + 5

            if(index % 3 === 2)
            {
                x = 100
                y += 64 + 5
            }
        });
    }

}