import Phaser from 'phaser'
import * as Colyseus from 'colyseus.js'
import Input from '../../../vite/Jo/react-ts/src/components/Input';

export default class FirstGame extends Phaser.Scene
{
    private client! : Colyseus.Client
    

	constructor() {
		super('first-game')
	}

    init()
    {
        // initialize the client with websocket connection
        this.client = new Colyseus.Client('ws://localhost:2567')
    }

	preload()
    {

	}

	async create() 
    {
        // if there is no one in the room, use joinOrCreate or it will throw an error
		const room = await this.client.joinOrCreate('my_room')
        console.log(room.sessionId)

        // onMessage handler for "keydown" message that we created in the server "MyRoom" class
        room.onMessage('action', ( message) => {
            console.log(message)
        })
     
        // on key down send the key to the server
        this.input.keyboard.on('keydown' , (event: KeyboardEvent) => {
            // translate key to action and send to server
            // ClientInputHandler
            const action_map : Record<string,integer> = {
                'w': 0,
                'a': 1,
                's': 2,
                'd': 3,
            }
            
            room.send('action', action_map[event.key])
        })
	}

  

    update() 
    {
    

    }

}

