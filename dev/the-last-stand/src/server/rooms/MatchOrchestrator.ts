import { Room, Client } from 'colyseus';
import { MatchState, GameEntityMapper, Position } from './states/MatchState';
import { IGameEntityMapper } from '../../typescript/interfaces/IGameEntityMapper';
import { IHitbox } from '../../typescript/interfaces/IHitbox';
import IUpdatePercentagesMessage from '../../typescript/interfaces/IUpdatePercentagesMessage';
import { EMessage } from '../../typescript/enumerations/EMessage';
import { IPlayerDeadMessage } from '../../typescript/interfaces/IPlayerDeadMessage';

interface IClient extends Client {
  selectedHero: string;
}
export class MatchOrchestrator extends Room<MatchState> {

  private positionHandler: Record<number, { x: number; y: number }> = {
    0: { x: 300, y: 400 },
    1: { x: 300, y: 400 },
    2: { x: 350, y: 400 },
    3: { x: 300, y: 400 },
  };

  private directionHandler: Record<number, string> = {
    0: 'right',
    1: 'left',
    2: 'right',
    3: 'left',
  };

  private heroHandler: Record<number, string> = {
    0: 'solana',
    1: 'solana',
    2: 'chuck',
    3: 'solana',
  };

  onCreate(options: any) {
    this.setState(new MatchState());

    this.onMessage(EMessage.UpdateSprite, (player, message: { x: number; y: number; direction?: string; anim?: string }) => {
      const { x, y, direction, anim } = message;
      this.state.updateSprite(player.id, x, y, direction, anim);
    });

    this.onMessage(EMessage.CreateHitbox, (player, message: any) => {
      const { entityType, attackerWidth, attackerHeight, position } = message;
      const entity: IHitbox = { owner: player.id, gameEntityType: entityType, position: position };
      this.broadcast(EMessage.CreateHitbox, entity);
    });

    this.onMessage(EMessage.RemoveAttackHitbox, (player, message: { id: string }) => {
      this.broadcast(EMessage.RemoveEntity, { id: message.id });
    });

    this.onMessage(EMessage.PlayerHurt, (player, message: { victim: string; attackForce: { x: string; y: string } }) => {
      const index = this.clients.findIndex((client) => client.id === message.victim);
      this.clients[index].send(EMessage.PlayerHurt, { attackForce: message.attackForce });
    });

    this.onMessage(EMessage.ServerUpdateHudDamage, (player, data: IUpdatePercentagesMessage) => {
      // console.log('server_update_hud_damage', data);
      this.broadcast(EMessage.ServerUpdateHudDamage, data);
    });

    this.onMessage(EMessage.PlayerDead, (player, message: IPlayerDeadMessage) => {
      this.broadcast(EMessage.PlayerDead, message);
    });

    this.onMessage(EMessage.RespawnPlayer, (player, message: { id: string }) => {
      console.log('respawn player', message.id);
    });
  }

  onJoin(client: IClient, options: any) {
    console.log(client.id, 'joined');

    // Assign a unique ID to the client and find his position in the array
    const index = this.clients.indexOf(client);
    client.selectedHero = this.heroHandler[index];
    client.send(EMessage.AssignPlayerID, { id: client.sessionId });
    this.state.playerIds.push(client.sessionId);

    // Create the new player's hero and broadcast it to all clients
    const entity: IGameEntityMapper = { id: client.sessionId,
      gameEntityType: client.selectedHero,
      position: { x: this.positionHandler[index].x, y: this.positionHandler[index].y}, 
      direction: this.directionHandler[index]
     };
    this.broadcast(EMessage.CreateEntity, entity);

    // Create an array of every players name(id) and index
    const players = this.clients.map((client) => {
      return { name: client.sessionId, index: this.clients.indexOf(client) };
    });
    // broadcast the array to all clients
    this.broadcast(EMessage.CreateHud, players);


    // Tell the new player to create all the other game entities
    this.state.gem.forEach((ge: GameEntityMapper) => {
      client.send(EMessage.CreateEntity, ge);
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
    this.broadcast(EMessage.RemoveEntity, { id: client.sessionId });
    this.broadcast(EMessage.ServerRemoveHudPlayer, { playerNameOrID: client.sessionId });

    // Remove the player's hero game state data from the game state
    this.state.gem.delete(client.sessionId);

  }

  onDispose() {
    console.log('room', this.roomId, 'disposing...');
  }
}
