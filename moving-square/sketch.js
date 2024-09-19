// square moving around scree
// 9/19/2024


let x = 0;
let y = 0;
let squareSize = 50;
let speed = 5;
let state = "right";

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  moveSquare();
  displaySquare();
}

function moveSquare() {
  if (state === "right") {
    x += speed;
    if (x >= width - squareSize) {
      state = "down";
    }
  }
  
  if (state === "down") {
    y += speed;
    if (y >= height - squareSize) {
      state = "left";
    }
  }
  
  if (state === "left") {
    x -= speed;
    if (x <= 0) {
      state = "up";
    }
  }
  
  if (state === "up") {
    y -= speed;
    if (y <= 0) {
      state = "right";
    }
  }
}

function mouseWheel(event) {
  squareSize += event.delta/100;
}

function displaySquare() {
  fill("black");
  square(x, y, squareSize);
}