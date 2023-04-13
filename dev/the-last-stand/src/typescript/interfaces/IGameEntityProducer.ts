import GameEntity from '../../server/game/GameEntity';
export interface IGameEntityProducer {
  (position: { x: number; y: number }): GameEntity;
}
