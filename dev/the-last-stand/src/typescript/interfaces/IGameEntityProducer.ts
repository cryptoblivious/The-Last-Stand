import GameEntity from '../../server/game/GameEntity';
export interface IGameEntityProducer {
  (): GameEntity;
}
