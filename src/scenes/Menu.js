class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        // load inages/title sprites
        this.load.image('rocket', './assets/rocket.png')
        this.load.image('spaceship', './assets/spaceship.png')
        this.load.image('starfield', './assets/starfield.png')
    }

    create() {
        // menu text
        this.add.text(20, 20, "Rocket Patrol Menu")
        // skip menu for now
        this.scene.start("playScene")
    }
}
