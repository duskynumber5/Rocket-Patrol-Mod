// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        // add object to existing scene
        scene.add.existing(this)    // add to existing, dsplayList, updateList
        this.isFiring = false       // track rocket's firing status
        this.moveSpeed = 2          // rocket speed in pixels/frame

        this.sfxShot = scene.sound.add('sfx-shot')
    }

    update() {

        // left & right movement
        if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
            this.x -= this.moveSpeed
        } else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
            this.x += this.moveSpeed
        }

        // fire button
        if (Phaser.Input.Keyboard.JustDown(keyFIRE) && !this.isFiring) {
            this.isFiring = true
            this.sfxShot.play()
            game.fire.visible = true;   // toggle fire text
        }
        // if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed
        }
        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false
            game.fire.visible = false;      // toggle fire text
            this.y = game.config.height - borderUISize - borderPadding
            game.timeRemaining -= 2                 // decrease time when a ship is hit
//            console.log("less time :(")
        }

    }

    // reset rocket to "ground"
    reset() {
        this.isFiring = false
        this.y = game.config.height - borderUISize - borderPadding
        game.fire.visible = false;      // toggle fire text
    }
}
