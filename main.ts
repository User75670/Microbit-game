function checkIfTooClose () {
    // Check if the player is too close to the point
    while (playerX == pointX && playerY == pointY || playerX == pointX - 1 && playerY == pointY || playerX == pointX + 1 && playerY == pointY || playerX == pointX && playerY == pointY - 1 || playerX == pointX && playerY == pointY + 1) {
        playAgain()
    }
}
function playAgain () {
    // Play again after the player reaches the point
    pointX = Math.randomRange(0, 4)
    pointY = Math.randomRange(0, 4)
}
input.onButtonPressed(Button.A, function () {
    // Move the player to the left
    if (isGameRunning && playerX > 0) {
        playerX += 0 - 1
        music.play(music.tonePlayable(330, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
    }
})
input.onButtonPressed(Button.AB, function () {
    // Move the player up
    if (isGameRunning && hasGameStarted && playerY > 0) {
        playerY += -1
        music.play(music.tonePlayable(330, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
    }
})
input.onButtonPressed(Button.B, function () {
    // Move the the player to the right
    if (isGameRunning && playerX < 4) {
        playerX += 1
        music.play(music.tonePlayable(330, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    // Move the player down
    if (isGameRunning && hasGameStarted && playerY < 4) {
        playerY += 1
        music.play(music.tonePlayable(330, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
    }
})
let points = 0
let hasGameStarted = false
let playerX = 0
let isGameRunning = false
let pointY = 0
let pointX = 0
let playerY = 0
playerY = 2
pointX = 4
pointY = 2
isGameRunning = true
// Other stuff to run the game (Please don't touch them or the game can break)
basic.forever(function () {
    if (isGameRunning) {
        if (!(hasGameStarted)) {
            basic.clearScreen()
            led.plot(pointX, pointY)
            led.plotBrightness(playerX, 2, 70)
            if (playerX == pointX && playerY == pointY) {
                basic.pause(120)
                basic.clearScreen()
                basic.showString("GO!")
                basic.showIcon(IconNames.Happy)
                hasGameStarted = true
                playAgain()
                playerX = Math.randomRange(0, 4)
                playerY = Math.randomRange(0, 4)
                checkIfTooClose()
            }
        } else {
            if (points == 10 || points == 20) {
                basic.clearScreen()
                basic.showNumber(points)
                playerX = Math.randomRange(0, 4)
                playerY = Math.randomRange(0, 4)
                checkIfTooClose()
                points += 1
            } else if (points == 30) {
                basic.clearScreen()
                basic.showNumber(points)
                basic.showString("You won!")
                isGameRunning = false
                basic.clearScreen()
            }
            if (playerX == pointX && playerY == pointY) {
                playAgain()
                checkIfTooClose()
                points += 1
            } else {
                basic.clearScreen()
                led.plot(pointX, pointY)
                led.plotBrightness(playerX, playerY, 70)
            }
        }
    } else {
        basic.clearScreen()
    }
})
