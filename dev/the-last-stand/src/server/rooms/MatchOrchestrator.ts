//  Nom du fichier : MatchOrchestrator.ts
//  Contexte : Classe héritant de la classe Room de colyseus pour gérer la partie et la communication entre les clients et le serveur. Selon les principes
//              du patron de conception "Mediator" et template method.
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski
//  Références : https://chat.openai.com/ - https://colyseus.io/ - https://www.youtube.com/watch?v=5HESa0Ibq8E 


import { Room, Client } from 'colyseus';
import { MatchState, GameEntityMapper } from './states/MatchState';
import { IGameEntityMapper } from '../../typescript/interfaces/IGameEntityMapper';
import { IHitbox } from '../../typescript/interfaces/IHitbox';
import IUpdatePercentagesMessage from '../../typescript/interfaces/IUpdatePercentagesMessage';
import { EMessage } from '../../typescript/enumerations/EMessage';
import { IPlayerDeadMessage } from '../../typescript/interfaces/IPlayerDeadMessage';

interface IClient extends Client {
  selectedHero: string;
}
export class MatchOrchestrator extends Room<MatchState> {

  private userUID : string = '';

  private positionHandler: Record<number, { x: number; y: number }> = {
    0: { x: 300, y: 400 },
    1: { x: 400, y: 400 },
    2: { x: 500, y: 400 },
    3: { x: 600, y: 400 },
  };

  private directionHandler: Record<number, string> = {
    0: 'right',
    1: 'left',
    2: 'right',
    3: 'left',
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
      this.broadcast(EMessage.RemoveAttackHitbox, { id: message.id });
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
      const index = this.clients.findIndex((client) => client.id === message.id);
      message.respawnPosition = this.positionHandler[index];
      this.broadcast(EMessage.PlayerDead, message);
    });

    this.onMessage(EMessage.RespawnPlayer, (player, message) => {
      const index = this.clients.findIndex((client) => client.id === player.id);
    });
  }

  onJoin(client: IClient, options: {user:{username:string, userNo:string, selectedCharacter:string, selectedScene:string}}) {

    const user = options.user;

    this.state.playerIds.push(client.sessionId);
    console.log(this.state.playerIds)

    // Assign a unique ID to the client and find his position in the array
    const index = this.clients.indexOf(client);
    client.selectedHero = user.selectedCharacter.toLowerCase();
    client.send(EMessage.AssignPlayerID, { id: client.sessionId });

    // Create the new player's hero and broadcast it to all clients
    const entity: IGameEntityMapper = { id: client.sessionId, playerName : user.username, gameEntityType: client.selectedHero, position: { x: this.positionHandler[index].x, y: this.positionHandler[index].y }, direction: this.directionHandler[index] };
    this.broadcast(EMessage.CreateEntity, entity);

    // Create a map of every players name(id) and index
    const players = this.clients.map((client) => {
      return { name: user.username, index: this.clients.indexOf(client) };
    });
    this.broadcast(EMessage.CreateHud, players);

    // Tell the new player to create all the other game entities
    this.state.gem.forEach((ge: GameEntityMapper) => {
      client.send(EMessage.CreateEntity, ge);
    });

    // Create the new player's hero game state data and add it to the game state
    const entityMap = new GameEntityMapper();
    entityMap.id = client.sessionId;
    entity.playerName = user.username;
    entityMap.gameEntityType = client.selectedHero;
    entityMap.position.x = this.positionHandler[index].x;
    entityMap.position.y = this.positionHandler[index].y;
    this.state.gem.set(client.sessionId, entityMap);
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, 'left matchorchestrator');

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
