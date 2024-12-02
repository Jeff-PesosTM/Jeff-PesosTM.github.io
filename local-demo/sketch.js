// local storage demo
//12/2/2024

let noOfClicks = 0;
let highestClick = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (getItem('highscore')){
    highestClick = getItem('highscore');
  }
}

function draw() {
  background(220);
  displayClicks();
  displayHighest();
}

function mousePressed() {
  noOfClicks++;
  if (noOfClicks > highestClick) {
    highestClick = noOfClicks;
    storeItem('highscore', highestClick);
  }
}

function displayClicks() {
  fill("black");
  textSize(75);
  text(noOfClicks, 100, height/2);
}

function displayHighest() {
  fill("green");
  textSize(75);
  text(highestClick, 400, height/2);
}
