class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        // load inages/title sprites
        this.load.image('rocket', './assets/rocket.png')
        this.load.image('spaceship', './assets/spaceship.png')
        this.load.image('starfield', './assets/starfield.png')
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })

        // load audio
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')
    }

    create() {

        // animation configuration
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        })

        let menuConfig = {
            fontFamily: 'Gill Sans',
            fontSize: '40px', 
          //  backgroundColor: '#FFFFFF',
            color: '#00FF00',
            align: 'center',
            padding: {top: 5, bottom: 5,},
            fixedWidth: game.config.width
        }
        let subTextConfig = {
            fontFamily: 'Gill Sans',
            fontSize: '24px', 
          //  backgroundColor: '#FF0000',
            color: '#F3B141',
            align: 'center',
            padding: {top: 5, bottom: 5,},
            fixedWidth: 0
        }
        let highScoreConfig = {
            fontFamily: 'Gill Sans',
            fontSize: '20px', 
            //backgroundColor: '#FF0000',
            color: '#00FF00',
            align: 'center',
            padding: {top: 5, bottom: 5,},
            fixedWidth: 0
        }

        // initalizing high score bank
        game.EZscoreBank = game.EZcarryover
        game.HRDscoreBank = game.HRDcarryover

        // high score banking
        if (game.EZscoreBank > 0) {
            game.EZhighScore = game.EZscoreBank
        } else {
            game.EZhighScore = 0
        }
        if (game.HRDscoreBank > 0) {
            game.HRDhighScore = game.HRDscoreBank
        } else {
            game.HRDhighScore = 0
        }

        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)

        this.add.rectangle(0, borderUISize + borderPadding * 2, game.config.width, borderUISize, 0x00FF00).setOrigin(0, 0)
        this.add.rectangle(0, borderUISize + borderPadding * 34, game.config.width, borderUISize, 0xF3B141).setOrigin(0, 0)

        this.add.image(150, 150, 'spaceship')
        this.add.image(500, 350, 'spaceship')


        // display menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize + borderPadding * 1.5, 'ROCKET PATROL', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + borderPadding * 20, 'Use ←→ arrows to move & (F) to fire', subTextConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding * 1.5, 'Press ← for Novice or → for Expert', subTextConfig).setOrigin(0.5)

        // display high score
        this.highScore = this.add.text(game.config.width / 4 - borderPadding * 10, game.config.height/4 - borderPadding * 10, "Novice High Score: " + game.EZhighScore, highScoreConfig)
        this.highScore = this.add.text(game.config.width / 4 + borderPadding * 23, game.config.height/4 - borderPadding * 10, "Expert High Score: " + game.HRDhighScore, highScoreConfig)

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT) 

        game.easy = false
        game.hard = false
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000,
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
            game.easy = true
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000,
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
            game.hard = true
        }
    }
}
