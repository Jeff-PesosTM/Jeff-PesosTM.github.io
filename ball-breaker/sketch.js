// grady chovan
// array and object notation project
// 10/15/2024

let ballX = 200;  
let ballY = 200; 
let dx = 5;
let dy = 3;
let ballSize = 30;
let obstacleArray = [];
let brickAmount = 2;
let size = 10;
let spacing = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < brickAmount; i++) {
    spawnBrick(i);
  }
}

function draw() {
  background(220);
  displayObstacles();
  player();
  ballLogic();
}

function player() {
  rect(10, 10, 10, 80); // paddle
}

function ballLogic(){
  ellipse(ballX, ballY, ballSize, ballSize); // ball
 
  if(ballX >= width-20 || ballX === 20){
    dx = -dx;
  }
  if(ballY >= height-20|| ballY === 20) {
    dy = -dy;
  }
  ballX += dx;
  ballY += dy;
}


// death logic
for (let brick of obstacleArray){
  if (obstacleHit(ballX, ballY, brick)) {
    bubbleArray.splice(obstacleArrayArray.indexOf(bubble), 1);
  }
}

function obstacleHit(x,y, theBrick) {
  let distanceAway = dist(x, y, theBrick.x, theBrick.y);
  return distanceAway < size; 
}


// obstacle logic
function spawnBrick(i){
  let someBrick = {
    x: 50,
    y: 50,
  };
  someBrick.x += spacing;
  obstacleArray.push(someBrick);
}

function displayObstacles() {
  for (let brick of obstacleArray){
    rect(brick.x, brick.y, brick.x + size, brick.y + size);
  }
}