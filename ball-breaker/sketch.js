// grady chovan
// array and object notation project
// 10/15/2024

let ballX;  
let ballY; 
let dx = 5;
let dy = -3;
let ballSize = 30;

let obstacleArray = [];

let brickSize = 40;
let spacing;

let sideBuffer;

let paddleX;
let paddleY;
let paddleWidth = 100;
let paddleHeight = 10;


function setup() {
  createCanvas(windowWidth, windowHeight);
  ballY = windowHeight-(40 + 10);
  ballX = windowWidth/2;
  mapSetup();
  //for(let x = sideBuffer/2; x <= windowWidth - sideBuffer/2; x += spacing){
  //let aBrick = spawnBrick(x, 0);
  //obstacleArray.push(aBrick);
  //}
}

function draw() {
  background(220);
  player();
  ballLogic();
  checkCollision();
  displayObstacles();
}

// player functions
function player() {
  paddleY = windowHeight-40;
  paddleX = mouseX - paddleWidth/2;
  rect(paddleX, paddleY, paddleWidth, paddleHeight); // paddle
  if (paddleHit(paddleX, paddleY)) {
    dy = -3;
  }
}

function paddleHit(x,y) { // used to detect if the ball hits the paddle
  return ballX >= x && ballX <= x + paddleWidth && ballY >= y - ballSize/2 && ballY <= y + paddleHeight;
}

function ballLogic(){
  ellipse(ballX, ballY, ballSize, ballSize); // ball
  if (ballX >= width - ballSize/2 || ballX <= 0 + ballSize/2){
    dx *= -1;
  }
  if (ballY >= height - ballSize/2 || ballY <= 0 + ballSize/2) {
    dy *= -1;
  }
  ballX += dx;
  ballY += dy;
}

// brick death logic
function checkCollision() {
  for (let brick of obstacleArray){
    if (obstacleHit(ballX, ballY, brick)) {
      obstacleArray.splice(obstacleArray.indexOf(brick), 1);
      dy *= -1;
    }
  }
}

function obstacleHit(x,y, theBrick) { // used in collision function
  let distanceAway = dist(x, y, theBrick.x + brickSize*2, theBrick.y + brickSize);
  return distanceAway <= ballSize; 
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
  sideBuffer = windowWidth/8;
  let x = sideBuffer/2;
  spacing = windowWidth/brickHAmount;
  while (brickHAmount > 0){
    let brickVAmount = 4;
    let y = sideBuffer/2;
    while (brickVAmount > 0) {
      let aBrick = spawnBrick(x, y);
      obstacleArray.push(aBrick);
      y += spacing;
      brickVAmount--;
    }
    x += spacing;
    brickHAmount--;
  }
}

//let x = sideBuffer/2; x <= windowWidth - sideBuffer/2; x += spacing
//let x = sideBuffer/2; x <= windowWidth - sideBuffer/2; x += spacing

//displays the bricks
function displayObstacles() {
  for (let aBrick of obstacleArray){
    rect(aBrick.x, aBrick.y, brickSize * 2, brickSize);
  }
}