let screen = 1;

//assets
let turtle
let player
let frontPage;
let bottle
let backgroundImage
let globe
let explosion
//score
let score = 0
let endScore = score
//positions
let myXPosT = 0
let myYPosT = 0
let myXPos = 0
let myYPos = 0
let randomX
let randomY
let randomXT
let randomYT
//speed
let myspeed = 5
//timer
let interval
let timer = 30
//The timer for the game
function updateTimer() {
  if (timer > 0 && !interval) {
    interval = setInterval(() => {
      if (timer > 0) {
        timer--
      } else {
        clearInterval(interval)
        interval = null
      }
    }, 1000)
  }
}
//images and sounds
function preload() {
  bottle = loadImage('/assets/Plastic.png')
  player = loadImage('/assets/Player.jpg')
  backgroundImage = loadImage('/assets/Water.jpg')
  explosion = loadImage('/assets/explosion.jpg')
  globe = loadImage('/assets/Globe.png')
  frontPage = loadImage('/assets/front page.jpg')
  turtle = loadImage('/assets/turtle.png')
}

//will be used for spawning objects in random areas 
function randomSpawn() {
  randomX = Math.floor(Math.random() * 340)
  randomY = Math.floor(Math.random() * 440)


}

function randomSpawn2() {
  randomXT = Math.floor(Math.random() * 340)
  randomYT = Math.floor(Math.random() * 440)
}

function setup() {
  createCanvas(500, 500);
}

randomSpawn2()
randomSpawn()

function draw() {
  if (screen == 1) {
    //background
    background(frontPage)
    //The game name
    textSize(30)
    strokeWeight(4)
    fill('green')
    text("Turtle Rescue", 155, 100)

    //A box that if the player clicks makes the user switch to the game
    fill('green')
    rect(210, 325, 75, 30)
    fill('white')
    text("PLAY", 210, 350)
  } else if (screen == 2) {
    createCanvas(500, 500)
    background(backgroundImage)

    updateTimer()
    //Grass
    fill("Green")
    rect(0, 0, 110, 500)
    rect(400, 0, 100, 500)

    //Player movement
    let newMyXPos = myXPos
    let newMyYPos = myYPos
    if (keyIsDown(RIGHT_ARROW)) {
      newMyXPos += myspeed
    }
    if (keyIsDown(DOWN_ARROW)) {
      newMyYPos += myspeed
    }
    if (keyIsDown(UP_ARROW)) {
      newMyYPos -= myspeed
    }
    if (keyIsDown(LEFT_ARROW)) {
      newMyXPos -= myspeed
    }


    //Player hitboxes
    let playerLeft = newMyXPos
    let playerRight = newMyXPos + 60
    let playerTop = newMyYPos
    let playerBottom = newMyYPos + 60
    //Prevents the player from crossing the border
    if (playerLeft < 110) {
      newMyXPos = 110
    }
    if (playerRight > 400) {
      newMyXPos = 400 - 60
    }
    if (playerTop < 0) {
      newMyYPos = 0
    }
    if (playerBottom > height) {
      newMyYPos = height - 60
    }
    myXPos = newMyXPos
    myYPos = newMyYPos
    image(player, myXPos, myYPos, 60, 60)



    //plastic
    image(bottle, randomX, randomY, 60, 60)
    let plasticTop, plasticBottom, plasticRight, plasticLeft
    plasticTop = randomY
    plasticBottom = randomY + 60
    plasticRight = randomX + 60
    plasticLeft = randomX

    if (
      playerLeft < plasticRight &&
      playerRight > plasticLeft &&
      playerTop < plasticBottom &&
      playerBottom > plasticTop
    ) {

      randomSpawn()
      score++
    }

    if (randomX <= 110) {
      randomSpawn()

    }
    //plastic
    //Turtle 
    image(turtle, randomXT, randomYT, 60, 60)
    let turLeft, turRight, turTop, turBottom;
    turLeft = randomXT
    turRight = randomXT + 60
    turTop = randomYT
    turBottom = randomYT + 60

    if (
      playerLeft < turRight &&
      playerRight > turLeft &&
      playerTop < turBottom &&
      playerBottom > turTop
    ) {
      randomSpawn2()
      timer -= 5

    }


    if (randomXT <= 110) {
      randomSpawn2()
    }
    //Turtle

    //Scoreboard

    fill('black')
    fill('white')
    text("time: " + timer, 410, 10)
    text("Score:" + score, 60, 10)
    //Scoreboard


    if (timer <= 0 && score !== 20) {
      //failure 
      clear()
      background("red")
      background(globe)
      image(explosion, 100, 100, 300, 300)
      fill("purple")
      textSize(20)
      stroke(400)
      text("You couldn't recycle enough plastic so now you lost", 10, 30)

    } else if (score >= 20) {
      //Winner
      clear()
      background("blue")
      background(globe)
      textSize(15)
      fill(0, 255, 150)
      textSize(18)
      stroke(400)
      text("you've recycled enough plastic to save the enviorment! Nice!", 10, 30)


    }

  }



  // End of function
}


function mouseClicked() {
  if (screen = 1) {
    if (mouseX >= 210 && mouseX <= 285 && mouseY >= 325 && mouseY <= 355) {
      screen = 2

    }
  }
}
