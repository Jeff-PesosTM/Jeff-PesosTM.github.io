// gravy's interactve scene

let x = 50;
let y = 50;
let size = 50;
let winWidth = 400;
let winHeight = 400;
let v;

function setup() {
  createCanvas(winWidth, winHeight);
  v = 1 +(1 -y/400);
}

function draw() {
  background(220);
  bounceBall();
  displayBall();
  //console.log(v);
}

function bounceBall() {
  if ((y >= height - size) && (v <= 0.4 && v >= -0.4)){
    y = height - size/2;
    v = 0;
  }
  else if (y >= height - (size/2) - 1) {
    v = v * -1;
    v += 2 +(1 -windowHeight/400);
    y += v;
  }
  if (y <= height - size/2) {
    v += 1 +(1 -windowHeight/400);
    y += v;
  }
}

function displayBall() {
  noStroke();
  fill(0);
  circle(x, y, size);
}