import Phaser from "phaser";
import type Server from '../../services/Server';
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

        //once state changes, re create the board
        server.onceStateChanged((state) => {
            this.createBoard(state)
        }
        )
    }

    update() {

    }

    // create board using match state data
    private createBoard(state : IMatchState)
    {
        const { width, height } = this.scale
        const cellSize = 128 

        let x = (width * 0.5) - cellSize
        let y = (height * 0.5) - cellSize 
        state.board.forEach((cellState, index) => {
            this.add.rectangle(x,y,cellSize,cellSize,0xffffff)
            x += cellSize + 5

            if(index % 3 === 2)
            {
                x = (width * 0.5) - cellSize
                y += cellSize + 5
            }
        });
    }

}