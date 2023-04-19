import GameEntity from '../../server/game/GameEntity';
import Mover from '../../server/game/game_components/Mover';
import Jumper from '../../server/game/game_components/Jumper';
import { IGameEntityProducer } from '../../typescript/interfaces/IGameEntityProducer';

export default class GameEntityFactory {
  idSequencer: number;
  gameEntityPrefabs: Map<string, IGameEntityProducer>;

  constructor() {
    this.idSequencer = 0;

    //console.log('instantiating idSequencer: ' + this.idSequencer);
    this.gameEntityPrefabs = new Map<string, IGameEntityProducer>();

    this.gameEntityPrefabs.set('solana', this.produceSolana);
    this.gameEntityPrefabs.set('rectangle', this.produceRectangle);
    //this.gameEntityPrefabs.set(); // add more prefabs here
  }

  produceSolana = (position: { x: number; y: number }): GameEntity => {
    const solana = new GameEntity({
      id: this.idSequencer,
      name: 'solana',
      size: { width: 0, height: 0 },
      position: position,
    });

    //solana.addComponent('renderer', new Renderer({ gameEntity: solana, name: 'renderer', spritesheets: [['moveLeft', 'solanaMoveLeft.png'], ['moveRight', 'solanaMoveRight.png'], ['jump', 'solanaJump']] }));
    solana.addComponent('mover', new Mover({ gameEntity: solana, name: 'mover', velocity: 10 }));
    solana.addComponent('jumper', new Jumper({ gameEntity: solana, name: 'jumper', velocity: 20, maxJumps: 2 }));
    //solana.addComponent(); // add more components here

    return solana;
  };

  produceRectangle = (position: { x: number; y: number }): GameEntity => {
    const rectangle = new GameEntity({
      id: this.idSequencer,
      name: 'rectangle',
      size: { width: 50, height: 25 },
      position: position,
    });

    return rectangle;
  };

  produce = (name: string, position: { x: number; y: number }): GameEntity => {
    const gameEntityProducer = this.gameEntityPrefabs.get(name);

    if (gameEntityProducer) {
      this.idSequencer += 1;
      const gameEntity = gameEntityProducer(position);
      return gameEntity;
    } else {
      throw new Error(`No prefab with name ${name} exists`);
    }
  };
}
