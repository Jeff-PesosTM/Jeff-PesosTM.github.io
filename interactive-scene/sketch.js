// grady's interactve scene

let x = 50;
let y = 50;
let ballSize = 50;
let winWidth = 400;
let winHeight = 400;
let v;
let acc = 1;
let xV = 0;
let xVMax = 10;
let xVMin = -10;

function setup() {
  createCanvas(winWidth, winHeight);
  v = 2 +(1 -y/400);
}

function draw() {
  background(220);
  bounceBall();
  moveBall();
  displayBall();
}

function bounceBall() {
  if (y >= height - ballSize && (v <= 0.1 && v >= -0.1)){ // stop moving
    y = height - ballSize/2;
    v = 0;
  }
  else if (y >= height - ballSize/2 - 1) { // bounce
    v = v * -1;
    v += 2 +(1 -windowHeight/400);
    y += v;
  }
  if (y <= height - ballSize/2) { // regular gravity
    v += 1 +(1 -windowHeight/400);
    y += v;
  }
  if (x - ballSize / 2 > winWidth) {
    x = -ballSize / 2;
  }
  if (x + ballSize / 2 < 0) {
    x = winWidth + ballSize/2;
  }
  x += xV;

}

function keyPressed() {
  if (key === " ") { // reset when space bar
    y = 50;
    v = 2 +(1 -y/400);
  } // change to make ball movement modifier change by acceleration constant for smooth movement
  
}

function displayBall() { // displays ball
  noStroke();
  fill(0);
  circle(x, y, ballSize);
}

function mouseWheel(event) { // changes ball size when scrolling
  ballSize += event.delta/100;
}

function moveBall() {
  if (keyIsDown(65) && x - xV > 2) {
    xV -= acc;
  }
  else if (keyIsDown(68)) {
    xV += acc;
  }
  else {
    xV = xV *0.9;
  }
}

// x > xV + ballSize/2 &&
// xV <= xVMax && x >= 0 + ballSize/2 && (xV >= xVMin && x <= width - ballSize/2 - 1)