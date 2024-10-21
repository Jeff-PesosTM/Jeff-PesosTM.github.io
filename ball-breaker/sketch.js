// grady chovan
// array and object notation project
// 10/15/2024
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
  width: 100,
  height: 10,
};

let sideBuffer;
let brickSize;

let obstacleArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball.y = windowHeight-(40 + 10);
  ball.x = windowWidth/2;
  mapSetup();
}

function draw() {
  background(220);
  player();
  ballLogic();
  checkCollision();
  displayObstacles();
}

//////////////////////////////////////////
// player functions
function player() {
  paddle.y = windowHeight-40;
  paddle.x = mouseX - paddle.width/2;
  rect(paddle.x, paddle.y, paddle.width, paddle.height); // actual paddle
  if (paddleHit(paddle.x, paddle.y)) {
    ball.dy = -3;
  }
}

// used to detect if the ball hits the paddle
function paddleHit(x,y) {
  return ball.x >= x && ball.x <= x + paddle.width && ball.y >= y - ball.size/2 && ball.y <= y + paddle.height;
}

///////////////////////////////////////////
function ballLogic(){
  ellipse(ball.x, ball.y, ball.size, ball.size); // ball
  if (ball.x >= width - ball.size/2 || ball.x <= 0 + ball.size/2) {
    ball.dx *= -1;
  }
  if (ball.y >= height - ball.size/2 || ball.y <= 0 + ball.size/2) {
    ball.dy *= -1;
  }
  ball.x += ball.dx;
  ball.y += ball.dy;
}

///////////////////////////////////////////
// brick death logic
function checkCollision() {
  for (let brick of obstacleArray){
    if (obstacleHit(ball.x, ball.y, brick)) {
      obstacleArray.splice(obstacleArray.indexOf(brick), 1);
      ball.dy *= -1;
    }
  }
}

// used to detect if ball hits a brick
function obstacleHit(x,y, theBrick) {
  return x + ball.size/2 >= theBrick.x && x - ball.size/2 <= theBrick.x + brickSize*2 && y + ball.size/2 >= theBrick.y && y - ball.size/2 <= theBrick.y + brickSize;
}

// obstacle logic
// spawning obstacle function used in setup
function spawnBrick(x,y){
  let brick = {
    x: x,
    y: y,
  };
  return brick;
}

function mapSetup() {
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
    rect(aBrick.x, aBrick.y, brickSize * 2, brickSize, 10);
  }
}