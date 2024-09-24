// traffic light
//9/24/2024

let rTime = 6000;
let yTime = 2000;
let gTime = 6000;
let colourState = 1;
let lastTime = 0;

function setup() {
  background(255);
  createCanvas(600, 600);
  drawOutlineOfLights();
}

function draw() {
  lightColour();
}

function drawOutlineOfLights() {
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);
  fill(255);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  ellipse(width/2, height/2, 50, 50); //middle
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

function lightColour() {
  if (millis() > lastTime + yTime && colourState === 1) {
    drawOutlineOfLights();
    fill(255, 0, 0);
    ellipse(width/2, height/2 - 65, 50, 50);
    lastTime = millis();
    colourState = 2;
  }
  if (millis() > lastTime + rTime && colourState === 2) {
    drawOutlineOfLights();
    fill(0, 255, 0);
    ellipse(width/2, height/2 + 65, 50, 50);
    lastTime = millis();
    colourState = 3
  }
  if (millis() > lastTime + gTime && colourState === 3) {
    drawOutlineOfLights();
    fill(255, 255, 0);
    ellipse(width/2, height/2, 50, 50);
    lastTime = millis();
    colourState = 1;
  }
}