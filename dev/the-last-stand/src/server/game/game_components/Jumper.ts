import GameEntity from '../GameEntity';
import GameComponent from './GameComponent';

export default class Jumper extends GameComponent {
  //  implements IExecutable
  // , iJumper
  velocity: number;
  maxJumps: number;
  jumpCount: number;

  constructor({ gameEntity, name = 'jumper', velocity = -10, maxJumps = 2 }: { gameEntity: GameEntity; name?: string; velocity?: number; maxJumps?: number }) {
    super(name, gameEntity);
    this.velocity = velocity;
    this.maxJumps = maxJumps;
    this.jumpCount = 0;
  }

  execute(): any {
    if (this.jumpCount < this.maxJumps) {
      this.gameEntity.position.y += this.velocity;
      this.jumpCount++;
    }
  }
}
