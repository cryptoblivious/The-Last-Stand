import Phaser from 'phaser'

import Bootstrap from './scenes/Bootstrap';
import Game from './scenes/Game';
import FirstGame from './scenes/FirstGame';

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
	scene: [Bootstrap, Game]
}

export default new Phaser.Game(config)