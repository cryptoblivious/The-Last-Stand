import Phaser from 'phaser';
import Bootstrap from './scenes/Bootstrap';
import MatchScene from './scenes/MatchScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'root',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: [Bootstrap, MatchScene],
};

export default new Phaser.Game(config);
