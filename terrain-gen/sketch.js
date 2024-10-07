// perlin terrain generation
// 10/7/2024

let rectArray = [];
let aRect;
const RECT_AMT = 2000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  howWide = width/ RECT_AMT;
  genTerrain(howWide);
}

function draw() {
  background(220);
  for (let aRect of rectArray) {
    rect(aRect.x, aRect.y, aRect.w, aRect.h);
  }
}

function genTerrain() {
  let time = 0;
  let deltaTime = 0.001;
  for (let x = 0; x < windowWidth; x+= howWide) {
    let theHeight = noise(time) * height;
    aRect = spawnRectangle(x, theHeight, howWide);
    rectArray.push(aRect);
    time += deltaTime;
  }
}

function spawnRectangle(leftSide, rectHeight, rectWidth) {
  let theRect = {
    x: leftSide,
    y: height - rectHeight,
    w: rectWidth,
    h: rectHeight,
  };
  return theRect;
}