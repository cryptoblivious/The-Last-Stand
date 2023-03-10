import GameComponent from './GameComponent';
import GameEntity from '../GameEntity';

export default class Mover extends GameComponent {
  velocity: number;

  constructor({ gameEntity, name = 'mover', velocity = 5 }: { gameEntity: GameEntity; name: string; velocity: number }) {
    super(name, gameEntity);
    this.velocity = velocity;
  }

  execute(direction: number): void {
    if (direction === 1) {
      console.log('Moving left');
      this.gameEntity.position.x -= this.velocity;
    } else if (direction === 2) {
      console.log('Moving down');
      this.gameEntity.position.y += this.velocity;
    } else {
      console.log('Moving right');
      this.gameEntity.position.x += this.velocity;
    }
  }
}
