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
      }
      if (grid[y][x] === visual.empty) {
        fill("white");
      }
      if (grid[y][x] === visual.one){
        fill("green");
        //text("test", x*cellSize, y* cellSize);
        console.log("test display");
      }

      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function mousePressed() {
  let xCor = Math.ceil(mouseX/cellSize)-1;
  let yCor = Math.ceil(mouseY/cellSize)-1;
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (yCor === y && xCor === x) {
        console.log(grid[y][x]);
      }
      // if (grid[y][x] === 0 && yCor === y && xCor === x) {
      //   grid[y][x] = 1;
      // }
      // else if (grid[y][x] === 1 && yCor === y && xCor === x) {
      //   grid[y][x] = 0;
      // }
    }
  }
}

function countMines() {
  let mineCount = 0;
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {

      if (grid[y][x] === visual.mine) {

        for (let y = 0; y < 9; y++) {
          for (let x = 0; x < 9; x++) {
            if (grid[y][x] === visual.mine) {
              mineCount++;
            }
          }
        }
        grid[y][x].splice(x, 1, mineCount);
        console.log(mineCount);
        mineCount = 0;
      }
    }
  }
}
