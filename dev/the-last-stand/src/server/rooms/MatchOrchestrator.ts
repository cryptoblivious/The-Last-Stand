import { Room, Client } from 'colyseus';
import { MatchState } from './schema/MatchState';
import GameEntityFactory from '../game/GameEntityFactory';
import { GameEntityMapper } from './schema/MatchState';
import { IGameEntityMapper } from '../../typescript/interfaces/IGameEntityMapper';

interface IClient extends Client {
  selectedHero: string;
}
export class MatchOrchestrator extends Room<MatchState> {
  maxClients: number = 4;
  gameEntityFactory: GameEntityFactory = new GameEntityFactory();

  private positionHandler: Record<number, { x: number; y: number }> = {
    0: { x: 50, y: 400 },
    1: { x: 100, y: 400 },
    2: { x: 150, y: 400 },
    3: { x: 200, y: 400 },
  };

  onCreate(options: any) {
    this.setState(new MatchState());

    this.onMessage('move_player', (client, message) => {
      const { playerId, x, y } = message;
      this.state.movePlayer(playerId, x, y);
    });
  }

  onJoin(client: IClient, options: any) {
    console.log(client.id, 'joined');

    client.selectedHero = 'chuck';

    // Assign a unique ID to the client and find his position in the array
    const index = this.clients.indexOf(client);
    client.send('assign_player_id', { id: client.sessionId });

    // Create the new player's hero and broadcast it to all clients
    const entity: IGameEntityMapper = { id: client.sessionId, gameEntityType: client.selectedHero, position: this.positionHandler[index] };
    this.broadcast('create_entity', entity);

    // Tell the new player to create all the other game entities
    this.state.gem.forEach((ge: GameEntityMapper) => {
      console.log('sending create_entity', ge);
      client.send('create_entity', ge);
    });

    // Create the new player's hero game state data and add it to the game state
    const entityMap = new GameEntityMapper({ id: client.sessionId, gameEntityType: client.selectedHero, position: this.positionHandler[index] });
    this.state.gem.set(client.sessionId, entityMap);
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, 'left');

    this.state.gem.delete(client.sessionId);
  }

  onDispose() {
    console.log('room', this.roomId, 'disposing...');
  }
}
