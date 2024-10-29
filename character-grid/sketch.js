// two dimensional array demo
//10/22/2024

let grassIMG;
let pathIMG;

let grid;
let cellSize;
let shouldToggleNeighbours = false;
let player = {
  x: 0,
  y: 0,
};

const GRID_SIZE = 8;
const OPEN_TILE = 0;
const IMPASSABLE_TILE = 1;
const PLAYER_TILE = 9;

function preload() {
  grassIMG = loadImage("grass.png");
  pathIMG = loadImage("pavement.png");
}

function setup() {
  if(windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  
  //add the player to the grid
  grid[player.y][player.x] = PLAYER_TILE;
}

function draw() {
  background(220);
  displayGrid();
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      //randomizer
      if (random(100) < 30) {
        newGrid[y].push(IMPASSABLE_TILE);
      }
      else {
        newGrid[y].push(OPEN_TILE);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(OPEN_TILE);
    }
  }
  return newGrid;
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "e") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "n") {
    shouldToggleNeighbours = !shouldToggleNeighbours;
  }
  if (key === "w") {
    //move up
    movePlayer(player.x, player.y - 1);
  }
  if (key === "a") {
    //move left
    movePlayer(player.x - 1, player.y);
  }
  if (key === "s") {
    //move down
    movePlayer(player.x, player.y + 1);
  }
  if (key === "d") {
    //move right
    movePlayer(player.x + 1, player.y);
  }
}

function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === IMPASSABLE_TILE) {
        image(grassIMG, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      if (grid[y][x] === OPEN_TILE) {
        image(pathIMG, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      if (grid[y][x] === PLAYER_TILE) {
        fill("green");
        square(x * cellSize, y * cellSize, cellSize);
      }
    }
  }
}


function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  //toggle self
  toggleCell(x, y);

  //toggle neighbours
  if (shouldToggleNeighbours) {
    toggleCell(x - 1, y);
    toggleCell(x + 1, y);
    toggleCell(x, y - 1);
    toggleCell(x, y + 1);
  }
}

function toggleCell(x, y) {
  //make sure the cell you're toggling is in the grid
  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
    if (grid[y][x] === IMPASSABLE_TILE) {
      grid[y][x] = OPEN_TILE;
    }
    else {
      grid[y][x] = IMPASSABLE_TILE;
    }
  }
}

function movePlayer(x,y) {
  if ( x>= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
    if (grid[y][x] === OPEN_TILE) {
      grid[player.y][player.x] = OPEN_TILE;
      player.x = x;
      player.y = y;
  
      grid[player.y][player.x] = PLAYER_TILE;
    }
  }
}