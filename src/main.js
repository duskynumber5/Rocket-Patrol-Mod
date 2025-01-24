// Maddison Lobo
// Rocket Patrol 2: Double Trouble
// _ hours

// the mods you chose, their point values, and if necessary, an explanation of their implementation
    // Implement a new timing/scoring mechanism that adds time to the clock for successful hits and subtracts time for misses (5)
    // Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
    // Create a new title screen (e.g., new artwork, typography, layout) (3)
    // Display the time remaining (in seconds) on the screen (3)
    // Implement parallax scrolling for the background (3)
    // Allow the player to control the Rocket after it's fired (1)
    // Implement the speed increase that happens after 30 seconds in the original game (1)
    // Track a high score that persists across scenes and display it in the UI (1)
    // Implement the 'FIRE' UI text from the original game (1)

// citations
    // 

// make screen size & add scenes
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ],
}

// make game!
let game = new Phaser.Game(config)

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT

