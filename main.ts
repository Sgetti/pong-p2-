radio.onReceivedNumber(function (receivedNumber) {
    check = 0
    if (receivedNumber <= 0 && receivedNumber >= 4) {
        ball_y = receivedNumber
    } else {
        ball_direction = receivedNumber
    }
})
input.onButtonPressed(Button.A, function () {
    paddle.move(1)
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "good") {
        if (ball_y == 0) {
            ball_y_shift = 1
            ball_direction = -135
        } else if (ball_y == 4) {
            ball_y_shift = 3
            ball_direction = -45
        } else if (ball_y < 0 && ball_y < 4 && ball_direction == -45) {
            ball_y_shift = ball_y + 1
        } else {
            ball_y_shift = ball_y - 1
        }
        ball = game.createSprite(4, ball_y_shift)
        ball.set(LedSpriteProperty.Direction, ball_direction)
    }
})
input.onButtonPressed(Button.B, function () {
    paddle.move(-1)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendNumber(1)
    radio.sendNumber(-135)
    radio.sendString("good")
})
let random = 0
let angle = 0
let ball_y_shift = 0
let ball_direction = 0
let ball_y = 0
let check = 0
let ball: game.LedSprite = null
let paddle: game.LedSprite = null
radio.setGroup(69)
paddle = game.createSprite(0, 2)
ball = game.createSprite(2, 2)
ball.delete()
check = 0
paddle.turn(Direction.Left, 90)
basic.forever(function () {
    basic.pause(2000)
    ball.move(1)
})
basic.forever(function () {
    if (ball.get(LedSpriteProperty.X) == 4 && check == 1) {
        radio.sendNumber(ball.get(LedSpriteProperty.Y))
        radio.sendNumber(ball.get(LedSpriteProperty.Direction))
        ball.delete()
        radio.sendString("good")
    }
})
basic.forever(function () {
    if (!(ball.isDeleted())) {
        if (ball.isTouching(paddle)) {
            ball.set(LedSpriteProperty.Direction, 135)
            ball.turn(Direction.Left, angle)
            check = 1
        } else if (ball.isTouchingEdge() && ball.get(LedSpriteProperty.X) == 0) {
            game.addScore(1)
        } else {
            ball.ifOnEdgeBounce()
        }
    }
})
basic.forever(function () {
    random = randint(-180, 180)
})
basic.forever(function () {
    if (random > 0) {
        angle = 90
    } else if (random < 0) {
        angle = 0
    } else {
        angle = 90
    }
})
