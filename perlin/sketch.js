// perlin noise demo
//  10/7/2024

let x;
let y;
let time = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
}

function draw() {
  background(220);
  moveBall();
  displayBall();
  time += 0.01;
}

function displayBall() {
  circle(x,y,50);
}

function moveBall(){
  x = noise(time) * width;
  y = noise(time+10) * height;
}
