import Phaser from 'phaser'

export default class FirstGame extends Phaser.Scene {
    private platforms? : Phaser.Physics.Arcade.StaticGroup
    private player? : Phaser.Physics.Arcade.Sprite
    private cursors? : Phaser.Types.Input.Keyboard.CursorKeys
    private stars? : Phaser.Physics.Arcade.Group
    private bombs? : Phaser.Physics.Arcade.Group

    private score = 0
    private scoreText? : Phaser.GameObjects.Text
    private gameOver = false
    

	constructor() {
		super('first-game')
	}

	preload() {

		this.load.image('background', 'assets/Background.png')
		this.load.image('star', 'assets/star.png')
		this.load.image('bomb', 'assets/bomb.png')
        this.load.image('ground', 'assets/platform.png')

        // loading the spritesheet for the dude dont use add image
        this.load.spritesheet('dude', 'assets/dude.png' , 
        { frameWidth: 32, frameHeight: 48 })
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


        this.player = this.physics.add.sprite(100, 450, 'dude')
        this.player.setBounce(0.2)
        // make the player collide with the bounds
        this.player.setCollideWorldBounds(true)

        // creating the animations for the dude and adding them to the scene
        // we ll use them in the movements of the player
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        })

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        })

        this.physics.add.collider(this.player, this.platforms)
        

        
        this.cursors = this.input.keyboard.createCursorKeys()

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        })

        this.stars.children.iterate(c  => {
            // type convertion/assertion sinon il chiale 
            const child = c as Phaser.Physics.Arcade.Image
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
        })

        this.physics.add.collider(this.stars, this.platforms)
        this.physics.add.overlap(this.player, this.stars, this.handleCollectStar, undefined, this)

        this.scoreText = this.add.text(16, 16, 'score: 0', { 
            fontSize: '32px', 
            fill: '#000' 
        })

        this.bombs = this.physics.add.group()
        this.physics.add.collider(this.bombs, this.platforms)
        this.physics.add.collider(this.player, this.bombs, this.handleHitBomb, undefined, this)
        


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

    private handleHitBomb(player: Phaser.GameObjects.GameObject, b: Phaser.GameObjects.GameObject) {
        //type  casting sinon il chiale
        const bomb = b as Phaser.Physics.Arcade.Image
        this.physics.pause()

        this.player?.setTint(0xff0000)
        this.player?.anims.play('turn')
        this.gameOver = true
        
    }

    // this is a private method that will be called when the player overlaps with a star
    private handleCollectStar(player: Phaser.GameObjects.GameObject, s: Phaser.GameObjects.GameObject) {
        //type  casting sinon il chiale 
        const star = s as Phaser.Physics.Arcade.Image
        star.disableBody(true, true)
        this.score += 10
        this.scoreText?.setText(`Score: ${this.score}`)

        if (this.stars?.countActive(true) === 0) {
            this.stars.children.iterate(c  => {
                // type convertion/assertion sinon il chiale 
                const child = c as Phaser.Physics.Arcade.Image
                child.enableBody(true, child.x, 0, true, true)
            })

            if (this.player ){
                const x = this.player?.x < 400 
                ? Phaser.Math.Between(400, 800) 
                : Phaser.Math.Between(0, 400)

                const bomb = this.bombs?.create(x, 16, 'bomb')
                bomb.setBounce(1)
                bomb.setCollideWorldBounds(true)
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
            }
            

        }

    }

    update() {
        if (!this.cursors) return

        if (this.cursors.left?.isDown ) {
            this.player?.setVelocityX(-160)

            this.player?.anims.play('left', true)
        }

        else if (this.cursors.right?.isDown) {
            this.player?.setVelocityX(160)

            this.player?.anims.play('right', true)
        }
        else{
            this.player?.setVelocityX(0)

            this.player?.anims.play('turn')
        }

        // jump if the player is touching the ground
        if (this.cursors.up?.isDown && this.player?.body.touching.down) {
            this.player?.setVelocityY(-330)
        }

    }

}

