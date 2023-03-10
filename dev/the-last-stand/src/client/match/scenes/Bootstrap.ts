import Phaser from 'phaser'
import LocalServer from '../../services/ClientSideInputHandler'
import { Client } from 'colyseus.js'

//holds logic for switching between scenes

export default class Bootstrap extends Phaser.Scene {

    private client? : Client

    constructor() 
    {
        super('bootstrap')
    }

    init(){
        this.client = new Client('ws://localhost:9001')

    }

    create() 
    {
        //launch game scene from here and pass server instance to it
        this.scene.launch('the-last-stand', {
            client : this.client
        })
    }
}