import GameEntity from './GameEntity';
import Mover from './game_components/Mover';
import Jumper from './game_components/Jumper';
import { IGameEntityProducer } from '../../typescript/interfaces/IGameEntityProducer';

export default class GameEntityFactory {
  idSequencer: number;
  gameEntityPrefabs: Map<string, IGameEntityProducer>;

  constructor() {
    this.idSequencer = 0;
    this.gameEntityPrefabs = new Map<string, IGameEntityProducer>();

    this.gameEntityPrefabs.set('solana', this.produceSolana);
    //this.gameEntityPrefabs.set(); // add more prefabs here
  }

  produceSolana(): GameEntity {
    let solana = new GameEntity({
      id: this.idSequencer,
      name: 'solana',
      position: { x: 0, y: 0 },
      size: { width: 0, height: 0 },
    });

    solana.addComponent('mover', new Mover({ gameEntity: solana, name: 'mover', velocity: 1 }));
    solana.addComponent('jumper', new Jumper({ gameEntity: solana, name: 'jumper', velocity: 1, maxJumps: 2 }));
    //solana.addComponent(); // add more components here

    return solana;
  }

  produce(name: string): GameEntity {
    const gameEntityProducer = this.gameEntityPrefabs.get(name);

    if (gameEntityProducer) {
      this.idSequencer++;
      const gameEntity = gameEntityProducer();
      return gameEntity;
    } else {
      throw new Error(`No prefab with name ${name} exists`);
    }
  }
}
