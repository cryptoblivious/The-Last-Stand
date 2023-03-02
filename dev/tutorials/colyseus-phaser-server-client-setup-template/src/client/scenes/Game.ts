import Phaser from "phaser";
import type Server from '../services/Server';

export default class Game extends Phaser.Scene {
    constructor() {
        super("game");
    }

    init()
    {

    }

    preload()
    { 

    }

    create(data : { server : Server})
    {
        //game recieves server instance from bootstrap scene
        const { server } = data
        server.join()
    }

    update() 
    {

    }
}