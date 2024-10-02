// grady's interactve scene
// click on canvas to bring ball to mouse, use a and d to move left and right. 
// extra for experts: scroll wheel adjusts ball size

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
let playerHealth = 10;
let playerHurt = false;

let spikeMode;
let spikeSize = 50;
let spikeMax;
let spikeX;
let constX;


function setup() {
  createCanvas(winWidth, winHeight);
  v = 2 +(1 -y/400);
  spikeMax = random(5,7);
  spikeX = random(0,25);
  constX = spikeX;
}

function bounceBall() {
  if (y >= height - ballSize && (v <= 0.1 && v >= -0.1)){ // stop moving
    y = height - ballSize/2;
    v = 0;
  }
  else if (y >= height - ballSize/2 - 1) { // bounce
    v = v * -1;
    v -= 2 +(1 -windowHeight/400);
    y -= v;
  }
  if (y <= height - ballSize/2) { // regular gravity
    v += 1 +(1 -windowHeight/400);
    y -= v;
  }
  if (x - ballSize / 2 > winWidth) {
    x = -ballSize / 2;
  }
  if (x + ballSize / 2 < 0) {
    x = winWidth + ballSize/2;
  }
  x += xV;
}

function mousePressed() { // mouse click brings ball
  y = mouseY;
  x = mouseX;
  v = 2 +(1 -y/400);
}

function displayBall() { // displays ball
  noStroke();
  if (playerHurt) {
    fill(0,255,0);
  }
  else {
    fill(0);
  }
  circle(x, y, ballSize);
  if (!playerHurt && y - ballSize < spikeSize + ballSize * (height - ballSize * 2) && y + ballSize / 2 > ballSize * (height - ballSize * 2)) {
    playerHurt = true;
    playerHealth--;
  }
}

function mouseWheel(event) { // changes ball size when scrolling
  ballSize += event.delta/100;
}

function moveBall() {
  if (keyIsDown(65)) {
    xV -= acc;
  }
  else if (keyIsDown(68)) {
    xV += acc;
  }
  else {
    xV = xV *0.9;
  }
}

function spikes() {
  spikeX = constX;
  for (let spikeAmount = 0; spikeAmount <= spikeMax; spikeAmount++) {
    fill(255,0,0);
    spikeX = constX * (spikeAmount +1);
    spikeX = spikeX + spikeSize * spikeAmount;
    triangle(spikeX, winHeight, spikeX + spikeSize, winHeight, spikeX + spikeSize/2, 400-spikeSize);
  }
}

function draw() {
  background(220);
  spikes();
  bounceBall();
  moveBall();
  displayBall();
}