// grady's interactve scene
// click on canvas to bring ball to mouse, use a and d to move left and right. 
// extra for experts: scroll wheel adjusts ball size

let x = windowWidth/2;
let y = windowHeight/2;
let ballSize = 50;
let v;
let acc = 1;
let xV = 0;
let xVMax = 10;
let xVMin = -10;

let ballArray = [];

let mvmt = { // movement properties
  airResistance: 0.995, // slows down the speed in each frame
  hitResistance: 0.8, // slows down the Y speed when the surface is hitted
  rollingResistance: 0.98, // slows down the X speed when rolling on the ground
  gravity: 0.05, // pulls the ball to the ground in each frame
  velocityFactor: 0.07 // velocity factor (converts vector from the mouse dragging to this environment)
};


function setup() {
  createCanvas(windowWidth, windowHeight);
  v = 2 +(1 -y/windowHeight);
}

function bounceBall() { // deprecated
  if (y >= height - ballSize && (v <= 0.1 && v >= -0.1)){ // stop moving
    y = height - ballSize/2;
    v = 0;
  }
  else if (y >= height - ballSize/2 - 1) { // bounce
    v = v * -1;
    v -= 2 +(1 -windowHeight/windowHeight);
    y -= v;
  }
  if (y <= height - ballSize/2) { // regular gravity
    v += 1 +(1 -windowHeight/windowHeight);
    y += v;
  }
  if (x - ballSize / 2 > windowWidth) {
    x = -ballSize / 2;
  }
  if (x + ballSize / 2 < 0) {
    x = windowWidth + ballSize/2;
  }
  x += xV;
}

function draw() {
  background(220);
  displayBall();
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
  this.position = position;
  this.velocity = velocity;
  this.radius = radius;
  this._borderCoords = {
      top: radius,
      bottom: localDimensions.height - radius,
      left: radius,
      right: localDimensions.width - radius
  };
}


function ballPhysics() {
  if (this.velocity.isNearZero() && this.position.Y == this._borderCoords.bottom && !this.velocity.isZero())
      this.velocity = Vector2D.zero(); // the ball is staying in place

  // move the ball using the velocity
  this.position = this.position.add(this.velocity);

  if (this.position.X <= this._borderCoords.left || this.position.X >= this._borderCoords.right) {
      // move ball inside the borders
      this.position.X = (this.position.X <= this._borderCoords.left) ?
                          this._borderCoords.left : this._borderCoords.right;

      // reflection
      this.velocity.X = -this.velocity.X;
  }
  if (this.position.Y <= this._borderCoords.top || this.position.Y >= this._borderCoords.bottom) {
      // move ball inside the borders
      this.position.Y = (this.position.Y <= this._borderCoords.top) ?
                          this._borderCoords.top : this._borderCoords.bottom;

      if (this.position.Y == this._borderCoords.bottom) {
          // when ball is on the ground, update resistances
          this.velocity.Y *= mvmt.hitResistance;
          this.velocity.X *= mvmt.rollingResistance;
      }

      // reflection
      this.velocity.Y = -this.velocity.Y;
  }

  // apply air resistance
  this.velocity = this.velocity.mult(verticalMovementProperties.airResistance);

  if (this.position.Y == this._borderCoords.bottom && Math.abs(this.velocity.Y) <= Vector2D.NEAR_ZERO)
      // the ball isn't falling or jumping
      this.velocity.Y = 0;
  else
      // apply gravity if falling or jumping
      this.velocity.Y += verticalMovementProperties.gravity;
}
