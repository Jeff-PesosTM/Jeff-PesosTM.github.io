// grady chovan
// array and object notation project
// 10/15/2024
//instructions: use the "a" or "d" key to move left or right, scroll wheel to change paddle width.
//Extra for experts: basic compatibility with window resizing

let ball = {
  x: 0,
  y: 0,
  dx: 5,
  dy: -3,
  size: 30,
};

let spacing = {
  x: 0,
  y: 0,
};

let paddle = {
  x: 0,
  y: 0,
  width: 200,
  height: 10,
  acc: 0.8,
  xV: 0,
};

let sideBuffer;
let brickSize;

let brickColour = ["red","blue", "pink", "yellow", "orange"];

let obstacleArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  mapSetup();
}

function draw() {
  if (gameIsOver()) {
    gameOver();
  }
  else {
    background(220);
    player();
    ballLogic();
    checkCollision();
    displayObstacles();
  }
}

//////////////////////////////////////////
// player functions
function player() {
  paddle.y = windowHeight-40;
  //paddle.x = mouseX - paddle.width/2;
  playerMove();
  fill("white");
  rect(paddle.x, paddle.y, paddle.width, paddle.height); // actual paddle
  if (paddleHit(paddle.x, paddle.y)) {
    ball.dy = -3;
    ball.dx += paddle.xV/10;
  }
}

function playerMove() {
  if (paddle.x > 0) {
    if (paddle.x + paddle.width < windowWidth) {
      if (keyIsDown(65)) {
        paddle.xV -= paddle.acc;
      }
      else if (keyIsDown(68)) {
        paddle.xV += paddle.acc;
      }
      else {
        paddle.xV *= 0.9;
      }
      paddle.x += paddle.xV;
    }
    else {
      paddle.xV = 0;
      paddle.x -= 1;
    }
  }
  else {
    paddle.xV = 0;
    paddle.x += 1;
  }
}

function mouseWheel(event) { // changes ball size when scrolling
  paddle.width += event.delta/100;
}

// used to detect if the ball hits the paddle
function paddleHit(x,y) {
  return ball.x >= x && ball.x <= x + paddle.width && ball.y >= y - ball.size/2 && ball.y <= y + paddle.height;
}

///////////////////////////////////////////
function ballLogic(){
  fill("white");
  ellipse(ball.x, ball.y, ball.size, ball.size); // ball
  if (ball.x >= width - ball.size/2 || ball.x <= 0 + ball.size/2) {
    ball.dx *= -1;
  }
  if (ball.y <= 0 + ball.size/2) {
    ball.dy *= -1;
  }
  ball.x += ball.dx;
  ball.y += ball.dy;
}

//displays game over text
function gameOver() {
  textSize(200);
  textAlign(CENTER, CENTER);
  fill("black");
  text("Game Over", width / 2, height / 2);
}

//checks if ball hits the bottom
function gameIsOver() {
  return ball.y >= height - ball.size/2;
}

///////////////////////////////////////////
// brick death logic
function checkCollision() {
  for (let brick of obstacleArray){
    if (obstacleHit(ball.x, ball.y, brick)) {
      obstacleArray.splice(obstacleArray.indexOf(brick), 1);
    }
  }
}

// used to detect if ball hits a brick
function obstacleHit(x,y, theBrick) {
  if (x + ball.size/2 >= theBrick.x && x - ball.size/2 <= theBrick.x + brickSize*2 && y + ball.size/2 >= theBrick.y && y - ball.size/2 <= theBrick.y + brickSize) {
    if (y >= theBrick.y && y <= theBrick.y + brickSize) {
      ball.dx *= -1;
    }
    else {
      ball.dy *= -1;
    }
    return true;
  }
  else {
    return false;
  }
}

// obstacle logic
// spawning obstacle function used in setup
function spawnBrick(x,y){
  let brick = {
    x: x,
    y: y,
    colour: color(random(255), 0, random(255)),
  };
  return brick;
}

function mapSetup() {
  ball.y = windowHeight-60;
  ball.x = windowWidth/2;

  paddle.x = windowWidth/2 -paddle.width/2;

  let brickHAmount = 7;
  brickSize = windowWidth/20;
  sideBuffer = windowWidth/16;
  let x = sideBuffer;

  spacing.x = windowWidth/brickHAmount-brickSize/4;
  spacing.y = windowHeight/brickHAmount-brickSize/8;

  while (brickHAmount > 0){
    let brickVAmount = 4;
    let y = sideBuffer;
    while (brickVAmount > 0) {
      let aBrick = spawnBrick(x, y);
      obstacleArray.push(aBrick);
      y += spacing.y;
      brickVAmount--;
    }
    x += spacing.x;
    brickHAmount--;
  }
}

//displays the bricks
function displayObstacles() {
  for (let aBrick of obstacleArray){
    fill(aBrick.colour);
    rect(aBrick.x, aBrick.y, brickSize * 2, brickSize, 5);
  }
}