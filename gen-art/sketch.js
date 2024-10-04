// generative art demo
//10/4/2024

const TILE_SIZE = 5;
let tileArray = [];
let weight = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //tile
  for (let x = 0; x < windowWidth; x+= TILE_SIZE) {
    for(let y = 0; y < windowHeight; y += TILE_SIZE){
      let aTile = spawnTile(x,y);
      console.log(dist(x, y, mouseX, mouseY)/100);
      tileArray.push(aTile);
    }
  }
}

function draw() {
  background(220);
  if (dist(x, y, mouseX, mouseY)/100 > 10){
    weight = 2;
  }
  else {
    weight = 1;
  }
  for (let tile2 of tileArray) {
    strokeWeight(weight);
    line(tile2.x1, tile2.y1, tile2.x2, tile2.y2);
  }
}

function spawnTile(x, y){
  let tile;
  let rng = random(100);

  if (rng < 50){
    tile = {
      x1: x - TILE_SIZE/2,
      y1: y - TILE_SIZE/2,
      x2: x + TILE_SIZE/2,
      y2: y + TILE_SIZE/2,
      lW: weight,
    };
  }
  else {
    tile = {
      x1: x - TILE_SIZE/2,
      y1: y + TILE_SIZE/2,
      x2: x + TILE_SIZE/2,
      y2: y - TILE_SIZE/2,
      lW: weight,
    };
  }
  return tile;
}