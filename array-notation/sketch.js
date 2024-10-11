// grady's interactve scene

let x;
let y;
let ballSize = 50;

let ballArray = [];

let borderCoords;
let dimensions;

let newBall;
let pos;

dimensions = {
  width: 100,
  height: 100 * (2/3),
};

let mvmt = { // movement properties
  airResistance: 0.995, // slows down the speed in each frame
  hitResistance: 0.8, // slows down the Y speed when the surface is hitted
  rollingResistance: 0.98, // slows down the X speed when rolling on the ground
  gravity: 0.05, // pulls the ball to the ground in each frame
  velocityFactor: 0.07 // velocity factor
};

class Walker {
  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.color = "red";
    this.speed = 5;
  }

  display() {
    fill(this.color);
    stroke(this.color);
    ellipse(this.x, this.y, 2, 2);
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
    //up
    this.y -= this.speed;
    }
    else if (choice < 50) {
    //down
    this.y += this.speed;
    }
    else if (choice < 75) {
    //left
    this.x -= this.speed;
    }
    else {
    //right
    this.x += this.speed;
    }
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  pos = {
    x: 100,
    y: 100,
  };
}

function draw() {
  background(200);
  spawnBall(pos, 1,50, dimensions);
  displayBall();
  //ballPhysics();
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


function spawnBall(velocity, radius, dimensions) {
  newBall.position.X = pos.x;
  newBall.position.Y = pos.y;
  newBall.velocity = velocity;
  newBall.radius = radius;
  borderCoords = {
    top: radius,
    bottom: dimensions.height - radius,
    left: radius,
    right: dimensions.width - radius
  };
  ballArray.push(newBall);
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