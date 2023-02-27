
import FirstGame from './FirstGame';
import Phaser from 'phaser';

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		},
	},
	scene: [FirstGame],
}

export default new Phaser.Game(config)