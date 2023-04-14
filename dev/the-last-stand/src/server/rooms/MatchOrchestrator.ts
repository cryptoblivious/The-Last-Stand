import { Room, Client } from 'colyseus';
import { MatchState, GameEntityMapper } from './schema/MatchState';
import { IGameEntityMapper } from '../../typescript/interfaces/IGameEntityMapper';

interface IClient extends Client {
  selectedHero: string;
}
export class MatchOrchestrator extends Room<MatchState> {
  maxClients: number = 4;

  private positionHandler: Record<number, { x: number; y: number }> = {
    0: { x: 200, y: 400 },
    1: { x: 100, y: 400 },
    2: { x: 150, y: 400 },
    3: { x: 200, y: 400 },
  };

  private directionHandler: Record<number, string> = {
    0: 'right',
    1: 'left',
    2: 'right',
    3: 'left',
  };

  private heroHandler: Record<number, string> = {
    0: 'chuck',
    1: 'solana',
    2: 'chuck',
    3: 'solana',
  };

  onCreate(options: any) {
    this.setState(new MatchState());

    this.onMessage('update_sprite', (player, message: { x: number; y: number; direction?: string; anim?: string }) => {
      const { x, y, direction, anim } = message;
      this.state.updateSprite(player.id, x, y, direction, anim);
      // console.log(this.state.gem.get(player.id)?.flipX)
    });

    this.onMessage('generate_attack_hitbox', (player, message: { attackType: string; attackerWidth: number; attackerHeight: number; direction: string; x: number; y: number }) => {
      //console.log('generating attack hitbox', message);
      const { attackType, attackerWidth, attackerHeight, direction, x, y } = message;
      const entity: IGameEntityMapper = { id: player.id, gameEntityType: 'rectangle', position: { x: x, y: y }, direction: direction };
      console.log('generating_attack_hitbox', entity);
      this.broadcast('create_entity', entity);
    });
  }

  onJoin(client: IClient, options: any) {
    console.log(client.id, 'joined');

    // Assign a unique ID to the client and find his position in the array
    const index = this.clients.indexOf(client);
    client.selectedHero = this.heroHandler[index];
    client.send('assign_player_id', { id: client.sessionId });
    this.state.playerIds.push(client.sessionId);

    // Create the new player's hero and broadcast it to all clients
    const entity: IGameEntityMapper = { id: client.sessionId, gameEntityType: client.selectedHero, position: this.positionHandler[index], direction: this.directionHandler[index] };
    this.broadcast('create_entity', entity);

    // Tell the new player to create all the other game entities
    this.state.gem.forEach((ge: GameEntityMapper) => {
      client.send('create_entity', ge);
    });

    // Create the new player's hero game state data and add it to the game state
    const entityMap = new GameEntityMapper();
    entityMap.id = client.sessionId;
    entityMap.gameEntityType = client.selectedHero;
    entityMap.position.x = this.positionHandler[index].x;
    entityMap.position.y = this.positionHandler[index].y;
    this.state.gem.set(client.sessionId, entityMap);
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, 'left');

    // Tell all clients to remove the player's hero
    this.broadcast('remove_entity', { id: client.sessionId });

    // Remove the player's hero game state data from the game state
    this.state.gem.delete(client.sessionId);
  }

  onDispose() {
    console.log('room', this.roomId, 'disposing...');
  }
}
