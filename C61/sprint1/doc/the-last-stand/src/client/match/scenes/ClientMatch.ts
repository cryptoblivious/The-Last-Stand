import Phaser from 'phaser'
import { Client } from 'colyseus.js'
import { Room } from 'colyseus';
import { IServerMatch } from '../../../typescript/interfaces/IServerMatch';
import GameEntity from '../../../server/game/GameEntity';
import { ServerMatch } from '../../../server/rooms/schema/ServerMatch';

export default class ClientMatch extends Phaser.Scene {
    private client?: Client
    private entities: Map<string, GameEntity> = new Map<string,GameEntity>()
    private players: Map<string, Phaser.GameObjects.Rectangle> = new Map<string,Phaser.GameObjects.Rectangle>()
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

    init() {}

    preload() {}

    async create(data: { client: Client }) {

        const { client } = data
        this.client = client
        if (!this.client) {
            throw new Error('client not found')
        }

        // if there is no one in the room, use joinOrCreate or it will throw an error
        const room = await this.client.joinOrCreate<ServerMatch>('match_observer')
       
        room.onMessage('res_action', (message) => {
            console.log(message)
        })

       
        this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
            // translate key to action and send to server
            if (event.key in this.inputHandler) {
                room.send('req_action', this.inputHandler[event.key])
            }
            console.log(event.key)
        })

        // // listen to state changes
        room.onStateChange((state: ServerMatch) => {
            this.entities = state.entities
            console.log(state)
        })
       
    }

    render_players(entities: Map<string, GameEntity>) {

        const activeEntitiesNames = Array.from(entities.keys())
        
        const rectToRemove = Array.from(this.players.values()).filter(rect => !activeEntitiesNames.includes(rect.name))
        for (const rect of rectToRemove) {
            rect.destroy()
            this.players.delete(rect.name)
        }

        for (const entity of entities.values()) {
            const existingRect = this.players.get(entity.name)
            if (!existingRect) {
                const rect = this.add.rectangle(entity.position.x , entity.position.y, entity.size.width, entity.size.height, 0x00ff00)
                rect.name = entity.name
                this.players.set(entity.name, rect)
            }
            else {
                existingRect.setPosition(entity.position.x, entity.position.y)
            }
        }
    }

    update() {
        this.render_players(this.entities)
    }

}

