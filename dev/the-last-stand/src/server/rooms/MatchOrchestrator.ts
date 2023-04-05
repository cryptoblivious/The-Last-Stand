import { Room, Client } from 'colyseus';
import { MatchState } from './schema/MatchState';
import Jumper from '../game/game_components/Jumper';
import GameEntity from '../game/GameEntity';
import Mover from '../game/game_components/Mover';
import GameEntityFactory from '../game/GameEntityFactory';

interface IClient extends Client {
  selectedHero: string;
}
export class MatchOrchestrator extends Room<MatchState> {
  maxClients: number = 4;
  // private gameEntity: GameEntity = new GameEntity(0, 'player', { x: 0, y: 0 }, { width: 32, height: 32 });
  gameEntityFactory: GameEntityFactory = new GameEntityFactory();

  private positionHandler: Record<number, { x: number; y: number }> = {
    0: { x: 50, y: 400 },
    1: { x: 100, y: 400 },
    2: { x: 150, y: 400 },
    3: { x: 200, y: 400 },
  };

  private inputHandler: Record<number, any> = {
    0: 'jumper',
    1: 'mover',
    2: 'mover',
    3: 'mover',
  };

  onCreate(options: any) {
    this.setState(new MatchState());
    // // onMessage handler for "keydown" message that we created in the client "MatchScene" class
    // this.onMessage('req_action', (client, message) => {
    //   this.state.entities.get(client.sessionId)?.components.get(this.inputHandler[message])?.execute(message);
    //   // console.log(this.state.entities.get(client.sessionId)?.position.x, this.state.entities.get(client.sessionId)?.position.y);
    //   const velocity = this.state.entities.get(client.sessionId)?.components.get(this.inputHandler[message])?.execute(message);
    //   this.broadcast(
    //     'res_action',
    //     { id: client.sessionId, velocity: velocity },
    //     {
    //       //except: client
    //     }
    //   );
    // });
  }

  // this.onMessage("action", (client, message) => {

  onJoin(client: IClient, options: any) {
    console.log(client.id, 'Tabarnak!');
    const index = this.clients.indexOf(client);
    this.broadcast('assign_id', { id: client.sessionId });
    client.selectedHero = 'chuck';
    let entity = { id: client.sessionId, gameEntityType: client.selectedHero, position: this.positionHandler[index] };
    this.state.gem.set(client.sessionId, entity);
    this.broadcast('create_entity', entity);

    //const entity = new GameEntity({ id: index, name: client.sessionId, position: this.positionHandler[index], size: { width: 32, height: 32 } });
    //const jumper = new Jumper({ gameEntity: entity, maxJumps: -1 });
    //entity.addComponent(jumper.name, jumper);

    //const mover = new Mover({ gameEntity: entity });
    //entity.addComponent(mover.name, mover);

    //this.state.entities.set(client.sessionId, entity);
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, 'left!');

    this.state.gem.delete(client.sessionId);
  }

  onDispose() {
    console.log('room', this.roomId, 'disposing...');
  }
}
