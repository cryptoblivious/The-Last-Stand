import { Room, Client } from 'colyseus';
import { ServerMatch } from './schema/ServerMatch';
import Jumper from '../game/game_components/Jumper';
import GameEntity from '../game/GameEntity';
import Mover from '../game/game_components/Mover';
import { IGameEntityProducer } from '../../typescript/interfaces/IGameEntityProducer';
import GameEntityFactory from '../game/GameEntityFactory';

export class MatchOrchestrer extends Room<ServerMatch> {
  maxClients: number = 4;
  // private gameEntity: GameEntity = new GameEntity(0, 'player', { x: 0, y: 0 }, { width: 32, height: 32 });
  gameEntityFactory: GameEntityFactory = new GameEntityFactory();

  private positionHandler: Record<number, { x: number; y: number }> = {
    0: { x: 50, y: 50 },
    1: { x: 100, y: 50 },
    2: { x: 150, y: 50 },
    3: { x: 200, y: 50 },
  };

  private inputHandler: Record<number, any> = {
    0: 'jumper',
    1: 'mover',
    2: 'mover',
    3: 'mover',
  };

  onCreate(options: any) {
    this.setState(new ServerMatch());

    // onMessage handler for "keydown" message that we created in the client "MatchScene" class
    this.onMessage('req_action', (client, message) => {
      this.state.entities.get(client.sessionId)?.components.get(this.inputHandler[message])?.execute(message);
      // console.log(this.state.entities.get(client.sessionId)?.position.x, this.state.entities.get(client.sessionId)?.position.y);
      this.broadcast('res_action', message, {
        //except: client
      });
    });
  }

  // this.onMessage("action", (client, message) => {

  onJoin(client: Client, options: any) {
    console.log(client.id, 'Tabarnak!');

    const index = this.clients.indexOf(client);

    const entity = new GameEntity({ id: index, name: client.sessionId, position: this.positionHandler[index], size: { width: 32, height: 32 } });
    const jumper = new Jumper({ gameEntity: entity, maxJumps: -1 });
    entity.addComponent(jumper.name, jumper);

    const mover = new Mover({ gameEntity: entity });
    entity.addComponent(mover.name, mover);

    this.state.entities.set(client.sessionId, entity);
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, 'left!');

    this.state.entities.delete(client.sessionId);
  }

  onDispose() {
    console.log('room', this.roomId, 'disposing...');
  }
}
