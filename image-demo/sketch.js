// image demo
//9/23/2024

let img1;

function preload() {
  img1 = loadImage('mario.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}


function draw() {
  background(220);
  image(img1, mouseX, mouseY, 100, 100);
}
