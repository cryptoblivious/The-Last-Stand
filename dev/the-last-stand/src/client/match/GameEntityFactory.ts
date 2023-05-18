import CGameEntity from '../../typescript/classes/CGameEntity';
import { IGameEntityProducer } from '../../typescript/interfaces/IGameEntityProducer';

export default class GameEntityFactory {
  idSequencer: number;
  gameEntityPrefabs: Map<string, IGameEntityProducer>;

  constructor() {
    this.idSequencer = 0;

    this.gameEntityPrefabs = new Map<string, IGameEntityProducer>();

    this.gameEntityPrefabs.set('rectangle', this.produceRectangle);
  }

  produceRectangle = (position: { x: number; y: number }): GameEntity => {
    const rectangle = new CGameEntity({
      id: this.idSequencer,
      name: 'rectangle',
      size: { width: 50, height: 25 },
      position: position,
    });

    return rectangle;
  };

  produce = (name: string, position: { x: number; y: number }): CGameEntity => {
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
