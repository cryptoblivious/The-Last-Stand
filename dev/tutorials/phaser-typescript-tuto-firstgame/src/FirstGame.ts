import Phaser from 'phaser'

export default class FirstGame extends Phaser.Scene {
    private platforms? : Phaser.Physics.Arcade.StaticGroup
	constructor() {
		super('first-game')
	}

	preload() {
		//this.load.setBaseURL('https://labs.phaser.io')

		this.load.image('background', 'assets/Background.png')
		this.load.image('star', 'assets/star.png')
		this.load.image('bomb', 'assets/bomb.png')
        this.load.image('ground', 'assets/platform.png')
        this.load.image('dude', 'assets/dude.png')
	}

	create() {
		const background = this.add.image(400, 300, 'background')
        const scaleX = this.cameras.main.width / background.width
        const scaleY = this.cameras.main.height / background.height 
        const scale = Math.max(scaleX, scaleY)
        background.setScale(scale).setScrollFactor(0)

        this.platforms = this.physics.add.staticGroup()

        const ground = this.platforms.create(400, 568, 'ground')
        ground.setScale(2).refreshBody()

        this.platforms.create(600, 400, 'ground')
        this.platforms.create(50, 250, 'ground')
        this.platforms.create(750, 220, 'ground')




		// const particles = this.add.particles('star')

		// const emitter = particles.createEmitter({
		// 	speed: 100,
		// 	scale: { start: 1, end: 0 },
		// 	blendMode: 'ADD',
		// })

		// const logo = this.physics.add.image(400, 100, 'bomb')

		// logo.setVelocity(100, 200)
		// logo.setBounce(1, 1)
		// logo.setCollideWorldBounds(true)

		// emitter.startFollow(logo)
	}
}