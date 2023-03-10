import { Client } from 'colyseus.js'

export default class Server {

    private client: Client

    // create a client instance
    constructor() {
        this.client = new Client('ws://localhost:2567')
        console.log(this.client)
    }

    async join() {
        // join room tic-tac-toe
        const room = await this.client.joinOrCreate('tic-tac-toe')
        console.log(room)
    }
}