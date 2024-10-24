// two dimensional array demo
//10/22/2024

let grid;

let cellSize;

const GRID_SIZE = 5;

let visual = {
  covered: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  flagged: 8,
  mine: 9,
  empty: 10,
};

function setup() {
  if(windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  textSize(200);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(220);
  displayGrid();
}

function windowResized() {
  if(windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  }
  else {
    resizeCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) <= 10) { // 10% chance to spawn a mine
        newGrid[y].push(visual.mine);
      }
      else {
        newGrid[y].push(visual.empty);
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
      newGrid[y].push(0);
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
}

function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === visual.mine) {
        fill("red");
        square(x * cellSize, y * cellSize, cellSize);
      }
      if (grid[y][x] === visual.empty) {
        fill("white");
        square(x * cellSize, y * cellSize, cellSize);
      }

    }
  }
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  toggleCell(x, y);
}

function toggleCell(x, y) {
  //make sure the cell you're toggling is in the grid
  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
    if (grid[y][x] === visual.mine ) {
      console.log("clicked on mine");
    }
    else if (grid[y][x] === visual.empty) {
      testCountMines(x, y);
      //console.log("reveal tile");
    }
  }
}

function countMines(x, y) {
  let mineCount = 0;
  console.log("test");
}

function testCountMines(x, y) {
  let mineCount = 0;
  if (grid[y-1][x -1] === visual.mine) {
    mineCount++;
  }
  if (grid[y-1][x] === visual.mine) {
    mineCount++;
  }
  if (grid[y-1][x +1] === visual.mine) {
    mineCount++;
  }
  if (grid[y][x -1] === visual.mine) {
    mineCount++;
  }
  if (grid[y][x] === visual.mine) {
    mineCount++;
  }
  if (grid[y][x +1] === visual.mine) {
    mineCount++;
  }
  if (grid[y+1][x -1] === visual.mine) {
    mineCount++;
  }
  if (grid[y+1][x] === visual.mine) {
    mineCount++;
  }
  if (grid[y+1][x+1] === visual.mine) {
    mineCount++;
  }
  console.log(mineCount);
  return mineCount;
}
