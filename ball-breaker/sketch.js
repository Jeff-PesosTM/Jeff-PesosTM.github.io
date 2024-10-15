// grady chovan
// array and object notation project
// 10/15/2024

let ballX = 200;  
let ballY = 200; 
let dx = 5;
let dy = 3;
let ballSize = 30;
let obstacleArray = [];
let brickAmount = 7;
let brickSize = 40;
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
  checkCollision()
}

function player() {
  rect(mouseX, windowHeight-40, 100, 10); // paddle
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
function checkCollision() {
  for (let brick of obstacleArray){
    if (obstacleHit(ballX, ballY, brick)) {
      bubbleArray.splice(obstacleArray.indexOf(bubble), 1);
    }
  }
}

function obstacleHit(x,y, theBrick) {
  let distanceAway = dist(x, y, theBrick.x, theBrick.y);
  return distanceAway < ballSize; 
}

// obstacle logic
function spawnBrick(i){
  let someBrick;
  for (let x = 0; x < windowWidth; x+= TILE_SIZE) {
    for(let y = 0; y < windowHeight; y += TILE_SIZE){
      let aTile = spawnTile(x,y);
      console.log(dist(x, y, mouseX, mouseY)/100);
      tileArray.push(aTile);
    }
  }

  obstacleArray.push(someBrick);
}

function displayObstacles() {
  for (let brick of obstacleArray){
    rect(brick.x, brick.y, brickSize * 2, brickSize);
  }
}