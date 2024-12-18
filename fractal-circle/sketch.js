// fractal circle demo using recursion
//12/18/2024

let size;

function setup() {
  createCanvas(windowWidth, windowHeight);
  size = width/2;
}

function draw() {
  background(220);
  recursiveCircle(width/2, height/2, size);
}

function mouseWheel(event) {
  size += event.delta/5;
}

function recursiveCircle(x, y, radius) {
  circle(x, y, radius*2);
  if (radius > 1) {
    recursiveCircle(x - radius/2, y, radius/2);
    recursiveCircle(x + radius/2, y, radius/2);
  }
}
