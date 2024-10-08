// grady's interactve scene

let x = windowWidth/2;
let y = windowHeight/2;
let ballSize = 50;
let v;
let acc = 1;
let xV = 0;
let xVMax = 10;
let xVMin = -10;

let ballArray = [];

let borderCoords;
let localDimensions;

let newBall;

let mvmt = { // movement properties
  airResistance: 0.995, // slows down the speed in each frame
  hitResistance: 0.8, // slows down the Y speed when the surface is hitted
  rollingResistance: 0.98, // slows down the X speed when rolling on the ground
  gravity: 0.05, // pulls the ball to the ground in each frame
  velocityFactor: 0.07 // velocity factor
};


function setup() {
  createCanvas(windowWidth, windowHeight);
  v = 2 +(1 -y/windowHeight);

  localDimensions = {
    width: 100, // 1 localDimensions.width is 1 local unit
    height: 100 * (2/3) // the canvas ratio is always 3:2
  };
  spawnBall(50,);
}

function draw() {
  background(220);
  displayBall();
  ballPhysics();
}

function displayBall() {
  for (let aBall of ballArray) {
    aBall.x += aBall.dx;
    aBall.y += aBall.dy;
  
    if (aBall.x >= width - aBall.r || aBall.x <= 0 + aBall.r){
      aBall.dx *= -1;
    }
    if (aBall.y >= height - aBall.r || aBall.y <= 0 + aBall.r){
      aBall.dy *= -1;
    }
  
    noStroke();
    fill(aBall.red, aBall.green, aBall.blue, aBall.alpha);
    circle(aBall.x, aBall.y, aBall.r*2);
  }
}


function spawnBall(position, velocity, radius, localDimensions) {
  newBall.position = position;
  newBall.velocity = velocity;
  newBall.radius = radius;
  borderCoords = {
    top: radius,
    bottom: localDimensions.height - radius,
    left: radius,
    right: localDimensions.width - radius
  };
}


function ballPhysics() {
  if (newBall.velocity.isNearZero() && newBall.position.Y === borderCoords.bottom && !newBall.velocity.isZero()){
    newBall.velocity = 0; // the ball is staying in place
  }

  // move the ball using the velocity
  newBall.position = newBall.position.add(newBall.velocity);

  if (newBall.position.X <= borderCoords.left || newBall.position.X >= borderCoords.right) {
    // move ball inside the borders
    newBall.position.X = newBall.position.X <= borderCoords.left ? borderCoords.left : borderCoords.right;
    // reflection
    newBall.velocity.X = -newBall.velocity.X;
  }

  if (newBall.position.Y <= borderCoords.top || newBall.position.Y >= borderCoords.bottom) {
    // move ball inside the borders
    newBall.position.Y = newBall.position.Y <= borderCoords.top ?
      borderCoords.top : borderCoords.bottom;

    if (newBall.position.Y === borderCoords.bottom) {
      // when ball is on the ground, update resistances
      newBall.velocity.Y *= mvmt.hitResistance;
      newBall.velocity.X *= mvmt.rollingResistance;
    }

    // reflection
    newBall.velocity.Y = -newBall.velocity.Y;
  }

  // apply air resistance
  newBall.velocity = newBall.velocity.mult(mvmt.airResistance);

  if (newBall.position.Y === borderCoords.bottom && Math.abs(newBall.velocity.Y) <= 0){
    // the ball isn't falling or jumping
    newBall.velocity.Y = 0;
  }
  else{
    // apply gravity if falling or jumping
    newBall.velocity.Y += mvmt.gravity;
  }
}