// grady chovan
// array and object notation project
// 10/15/2024

let ballX;  
let ballY; 
let dx = 5;
let dy = -3;
let ballSize = 30;

let obstacleArray = [];

let brickAmount = 7;
let brickSize = 40;
let spacing = 100;

let sideBuffer = 50;


function setup() {
  createCanvas(windowWidth, windowHeight);
  ballY = windowHeight-(40 + 10);
  ballX = windowWidth/2;
  for(let x = sideBuffer/2; x <= windowWidth - sideBuffer/2; x += spacing){
    let aBrick = spawnBrick(x, 0);
    obstacleArray.push(aBrick);
  }
  console.log(obstacleArray);
}

function draw() {
  background(220);
  player();
  ballLogic();
  checkCollision();
  displayObstacles();
}

function player() {
  rect(mouseX, windowHeight-40, 100, 10); // paddle
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

//displays the bricks
function displayObstacles() {
  for (let aBrick of obstacleArray){
    rect(aBrick.x, aBrick.y, brickSize * 2, brickSize);
  }
}