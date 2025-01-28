class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0, 0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0, 0)


        // define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        // initalize score
        this.p1Score = 0

        // default to 0
        this.highScore = 0    

        // initalize high score for EZ
        if (game.hard == false && game.easy == true && game.EZscoreBank > 0) {
            this.highScore = game.EZscoreBank

        } 
        // initalize high score for HRD
        if (game.hard == true && game.easy == false && game.HRDscoreBank > 0) {
            this.highScore = game.HRDscoreBank
        } 

        // display score and timer
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px', 
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig)
        this.timeRight = this.add.text(game.config.width - borderUISize * 4.12 - borderPadding, borderUISize + borderPadding * 2, game.settings.gameTimer/1000, scoreConfig)
        
        // display high score and fire
        let fireConfig = {
            fontFamily: 'Courier',
            fontSize: '16px', 
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 3,
                bottom: 3,
            },
        }

        if (game.hard == false && game.easy == true) {
            this.topScore = this.add.text(game.config.width / 2.5, borderUISize + borderPadding * 2, "High Score: " + this.highScore, fireConfig)
        } 
        if (game.hard == true && game.easy == false) {
//            console.log('hard score posted')
            this.topScore = this.add.text(game.config.width / 2, borderUISize + borderPadding * 2, "High Score: " + this.highScore, fireConfig)
        }
        
        game.fire = this.add.text(game.config.width / 2.15, borderUISize + borderPadding * 4.5, "FIRE", fireConfig)
        game.fire.visible = false;

        // update timer
        game.timeRemaining = game.settings.gameTimer/1000
        let timer = this.time.addEvent({
            delay: 1000,
            callback: () => {
//                console.log("Timer tick")
                game.timeRemaining--
                this.timeRight.setText(game.timeRemaining)

                if(game.timeRemaining <= 0) {
                    this.time.removeEvent(timer)
                    this.timeRight.text = 0
                    // game over scene
                    if (!this.gameOver) {
                        scoreConfig.fixedWidth = 0
                        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
                        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5) 
                        this.gameOver = true
                    }
                }
            },
            callbackScope: this,
            loop: true
        })

        // 30 second timer
        scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(30000, () => {
            game.settings.spaceshipSpeed += 2
        }, null, this)

        // GAME OVER flag
        this.gameOver = false 
    }

    update() {
        // update high score
        if(this.highScore < this.p1Score) {
            this.highScore = this.p1Score
            this.topScore.text = "High Score: " + this.highScore
        }

        // check key input for restart or menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            if (game.hard == false && game.easy == true) {
                game.EZscoreBank = this.highScore
            }
            if (game.hard == true && game.easy == false) {
                game.HRDscoreBank = this.highScore
            }
            this.scene.restart()
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            if (game.hard == false && game.easy == true) {
                game.EZcarryover = this.highScore
            }
            if (game.hard == true && game.easy == false) {
                game.HRDcarryover = this.highScore
            }
            game.firstRound = false
            this.scene.start("menuScene")
        }

        // move the background
        this.starfield.tilePositionX -= 4
        if(!this.gameOver) {
            this.p1Rocket.update()      // update rocket sprite
            this.ship01.update()        // update spaceships (x3)
            this.ship02.update()
            this.ship03.update()
        } 
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)
        } 
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
        } 
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
        } 
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&
        rocket.x + rocket.width > ship.x &&
        rocket.y < ship.y + ship.height &&
        rocket.height + rocket.y > ship.y) {
            return true
        } else {
            return false
        }
    }

    shipExplode(ship) {
        // temp hide ship
        ship.alpha = 0

        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0)
        boom.anims.play('explode')              // play explode animation
        const emitter = this.add.particles(ship.x, ship.y + 15, 'rocket', {
            speed: 200,
            lifespan: 1000,
            quantity: 5,
            alpha: { start: 1, end: 0 }
        })
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset()                        // reset ship position
            ship.alpha = 1                      // make ship visible again
            boom.destroy()                      // remove explosion sprit
            emitter.destroy()
        })
        // score add and time/text update
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score
        game.timeRemaining += 2                 // increase time when a ship is hit
//        console.log("more time!")

        this.sound.play('sfx-explosion')
    }
}   
