// bubble demo
// 10/10 2024

let bubbleArray = [];
let deathLoc = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 5; i++) {
    spawnBubble();
  }
  //window.setInterval(spawnBubble, 500);
}

function draw() {
  background(220);
  //moveBubblesRand();
  bubbleNoise();
  displayBubbles();
  displayGraves();
}

function mousePressed() {
  for (let bubble of bubbleArray){
    if (clickedOnBubble(mouseX, mouseY, bubble)) {
      bubbleArray.splice(bubbleArray.indexOf(bubble), 1);
      grave(mouseX, mouseY);
      spawnBubble();
    }
  }
}

function grave(graveX, graveY) {
  let grave = {
    x: graveX,
    y: graveY,
  };
  deathLoc.push(grave);
}

function clickedOnBubble(x,y, theBubble) {
  let distanceAway = dist(x, y, theBubble.x, theBubble.y);
  return distanceAway < theBubble.radius; 
}

function displayBubbles() {
  for (let bubble of bubbleArray){
    noStroke();
    fill(bubble.r, bubble.g, bubble.b, bubble.alpha);
    circle(bubble.x, bubble.y, bubble.radius*2);
  }
}

function displayGraves() {
  for (let grave of deathLoc){
    fill(0);
    textAlign(CENTER, CENTER);
    text("x", grave.x, grave.y);
  }
}

function moveBubblesRand(){
  for (let bubble of bubbleArray) {
    let choice = random(100);
    if (choice < 50) {
      bubble.y -= bubble.speed;
    }
    else if (choice < 65) {
      bubble.y += bubble.speed;
    }
    else if (choice < 75) {
      bubble.x += bubble.speed;
    }
    else {
      bubble.x -= bubble.speed;
    }
  }
}

function bubbleNoise() {
  for (let bubble of bubbleArray) {
    bubble.x = noise(bubble.timeX)*width;
    bubble.y = noise(bubble.timeY)*height;

    bubble.timeX += bubble.deltaTime;
    bubble.timeY += bubble.deltaTime;
  }
}

function spawnBubble(){
  let someBubble = {
    x: random(0,width),
    y: height + random(50,100),
    speed: random(2,3),
    radius: random(20,50),
    r: random(255),
    g: random(255),
    b: random(255),
    alpha: random(50, 200),
    timeX: random(99999),
    timeY: random(99999),
    deltaTime: 0.01,
  };
  bubbleArray.push(someBubble);
}
