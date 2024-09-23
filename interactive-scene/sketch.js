// grady's interactve scene

let x = 50;
let y = 50;
let size = 50;
let winWidth = 400;
let winHeight = 400;
let v;

function setup() {
  createCanvas(winWidth, winHeight);
  v = 2 +(1 -y/400);
}

function draw() {
  background(220);
  bounceBall();
  displayBall();
}

function bounceBall() {
  if ((y >= height - size) && (v <= 0.1 && v >= -0.1)){ // stop moving
    y = height - size/2;
    v = 0;
  }
  else if (y >= height - (size/2) - 1) { // bounce
    v = v * -1;
    v += 2 +(1 -windowHeight/400);
    y += v;
  }
  if (y <= height - size/2) { // regular gravity
    v += 1 +(1 -windowHeight/400);
    y += v;
  }
}

function keyPressed() {
  if (key === ' ') { // reset when space bar
    y = 50;
    v = 2 +(1 -y/400);
    displayBall();
    console.log('test');
  }
  if (keyIsDown(87)){ // change to make ball movement modifier change by acceleration constant for smooth movement
    y -= 10;
  } 
  if (keyIsDown(83)){
    y += 10;
  }
  if (keyIsDown(65)) {
    x-= 10;
  } 
  if (keyIsDown(68)) {
    x += 10;
  } 
}

function displayBall() { // displays ball
  noStroke();
  fill(0);
  circle(x, y, size);
}

function mouseWheel(event) { // changes ball size when scrolling
  size += (event.delta/100);
}