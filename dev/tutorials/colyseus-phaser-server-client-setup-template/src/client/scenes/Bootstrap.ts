import Phaser from 'phaser'


//holds logic for switching between scenes

export default class Bootstrap extends Phaser.Scene {
    constructor() 
    {
        super('bootstrap')
    }

    preload() 
    {

    }

    create() 
    {
        console.log('bootstrap scene')
        this.scene.launch('game')
    }
}