//  Nom du fichier : MatchOrchestrator.ts
//  Contexte : Classe servant de structure de données partagée entre les clients et le serveur pour le game Lobby, peu utilisée dans le projet final mais 
              // laissée pour des fins de d'évolutivité
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski
//  Références : https://chat.openai.com/ - https://colyseus.io/ - https://www.youtube.com/watch?v=5HESa0Ibq8E 


import { Schema, type, MapSchema, ArraySchema, DataChange } from '@colyseus/schema';

export class Position extends Schema {
  @type('number') x: number = 0;
  @type('number') y: number = 0 ;
}
export class GameEntityMapper extends Schema {
  @type('string') id: string = '';
  @type('string') gameEntityType: string = '';
  @type(Position) position: Position = new Position();
  @type('string') anim?: string = '';
  @type('string') direction?: string = '';
}
export class MatchState extends Schema {
  @type({ map: GameEntityMapper }) gem: MapSchema<GameEntityMapper> = new MapSchema<GameEntityMapper>();
  @type(['string']) playerIds: ArraySchema<string> = new ArraySchema<string>();
  
  
  updateSprite(playerId: string, x: number, y: number, direction?: string, anim?: string) {
    const player = this.gem.get(playerId);
    if (player) {
      player.position.x = x;
      player.position.y = y;
      player.direction = direction;
      player.anim = anim;
    }
  }
}
