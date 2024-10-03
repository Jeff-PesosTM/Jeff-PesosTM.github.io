// bouncing ball demo
//10/3/2024

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 10; i++) {
    spawnBall(width/2, height/2);
  }
}

function draw() {
  background(220);

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

function mousePressed() {
  spawnBall(mouseX, mouseY);
}

function spawnBall(theX,theY) {
  let ball = {
    x: theX,
    y: theY,
    r: random(30,70),
    dx: random(-5, 5),
    dy: random(-5, 5),
    red: random(0, 255),
    green: 0,
    blue: 120,
    alpha: 125,
  };
  ballArray.push(ball);
}