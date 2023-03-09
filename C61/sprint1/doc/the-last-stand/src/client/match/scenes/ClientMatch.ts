import Phaser from 'phaser'
import { Client } from 'colyseus.js'
import { Room } from 'colyseus';
import { IServerMatch } from '../../../typescript/interfaces/IServerMatch';
import GameEntity from '../../../server/game/GameEntity';
import { ServerMatch } from '../../../server/rooms/schema/ServerMatch';
import { onStateChange, onJoin } from '../../../../../../../../dev/tutorials/colyseus-get-started/loadtest/example';

export default class ClientMatch extends Phaser.Scene {
    private client?: Client
    private entities: GameEntity[] = []
    private rectangles: Phaser.GameObjects.Rectangle[] = []
    private inputHandler: Record<string, number> =
        {
            ' ': 0,
            'w': 0,
            'a': 1,
            's': 2,
            'd': 3,
            'j': 4,
            'k': 5,
            'l': 6,
            'u': 7,
            'i': 8,
            'o': 9
        }

    constructor() {
        super('the-last-stand')
    }

    init() {

    }

    preload() {

    }

    async create(data: { client: Client }) {

        const { client } = data
        this.client = client
        if (!this.client) {
            throw new Error('client not found')
        }
        // if there is no one in the room, use joinOrCreate or it will throw an error
        const room = await this.client.joinOrCreate<ServerMatch>('match_observer')
        console.log(room.sessionId)
        // if (!room) {
        //     throw new Error('room not found')
        // }
        // this.room = room
        // onMessage handler for "req_action" message that we created in the server "MatchObserver" class
        room.onMessage('res_action', (message) => {
            console.log(message)
        })

        room.onMessage('entities', (entities) => {
            this.entities = entities

        })


        // on key down send the key to the server
        this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
            // translate key to action and send to server
            if (event.key in this.inputHandler) {
                room.send('req_action', this.inputHandler[event.key])
            }
        })

        // room.onStateChange((state: ServerMatch) => {
        //     console.log(state)
        // })



        // // listen to state changes

        room.onStateChange((state: ServerMatch) => {
            this.entities = state.entities
            // console.log(state.entities.length)
        })
        // room.onStateChange((state) => {
        //     console.log(state)
        //     for (const entity of state.entities) {
        //         const rect = this.add.rectangle(entity.position.x, entity.position.y, 10, 10, 0x00ff00)
        //     }
        // })

    }

    render_players(entities: GameEntity[]) {

        const activeEntitiesNames = entities.map(entity => entity.name)
        const rectToRemove = this.rectangles.filter(rect => !activeEntitiesNames.includes(rect.name))
        for (const rect of rectToRemove) {
            rect.destroy()
            const index = this.rectangles.indexOf(rect)
            if (index !== -1) {
                this.rectangles.splice(index, 1)
            }
        }

        for (const entity of entities) {
            const existingRect = this.rectangles.find(rect => rect.name === entity.name)
            if (!existingRect) {
                const rect = this.add.rectangle(entity.position.x, entity.position.y, entity.size.width, entity.size.height, 0x00ff00)
                rect.name = entity.name
                this.rectangles.push(rect)
            }
            // console.log(this.rectangles.length)
        }

    }


    update() {
        this.render_players(this.entities)
        // console.log(this.entities.length)

    }



}

