import Phaser from 'phaser'
import Server from '../services/Server'

//holds logic for switching between scenes

export default class Bootstrap extends Phaser.Scene {

    private server!: Server

    constructor() 
    {
        super('bootstrap')
    }

    init(){
        this.server = new Server()
    }


    create() 
    {
        //launch game scene from here and pass server instance to it
        this.scene.launch('game', {
            server: this.server
        })
    }
}