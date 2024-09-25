// traffic light
//9/24/2024

let rTime = 6000;
let yTime = 2000;
let gTime = 6000;
let colourState = "yellow";
let lastTime = -2000;

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
  if (millis() > lastTime + yTime && colourState === "yellow") { // red
    drawOutlineOfLights();
    colourState = "red";
    fill(colourState);
    ellipse(width/2, height/2 - 65, 50, 50);
    lastTime = millis();
  }
  if (millis() > lastTime + rTime && colourState === "red") { // green
    drawOutlineOfLights();
    colourState = "green";
    fill(colourState);
    ellipse(width/2, height/2 + 65, 50, 50);
    lastTime = millis();
  }
  if (millis() > lastTime + gTime && colourState === "green") { // yellow
    drawOutlineOfLights();
    colourState = "yellow";
    fill(colourState);
    ellipse(width/2, height/2, 50, 50);
    lastTime = millis();
  }
}