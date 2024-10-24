// two dimensional array demo
//10/22/2024

let grid;

let cellSize;

const GRID_SIZE = 8;

function setup() {
  if(windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
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
      if (random(100) < 50) {
        newGrid[y].push(1);
      }
      else {
        newGrid[y].push(0);
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
      if (grid[y][x] === 1) {
        fill("black");
      }
      if (grid[y][x] === 0) {
        fill("white");
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

// function mousePressed() {
//   // console.log('x:', Math.ceil(mouseX/cellSize))
//   // console.log('y:', Math.ceil(mouseY/cellSize))
//   let xCor = Math.ceil(mouseX/cellSize)-1;
//   let yCor = Math.ceil(mouseY/cellSize)-1;
//   for (let y = 0; y < GRID_SIZE; y++) {
//     for (let x = 0; x < GRID_SIZE; x++) {
//       if (grid[y][x] === 0 && yCor === y && xCor === x) {
//         grid[y][x] = 1;
//       }
//       else if (grid[y][x] === 1 && yCor === y && xCor === x) {
//         grid[y][x] = 0;
//       }
//     }
//   }
// }

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  //toggle self
  toggleCell(x, y);

  //toggle neighbours
  toggleCell(x - 1, y);
  toggleCell(x + 1, y);
  toggleCell(x, y - 1);
  toggleCell(x, y + 1);
}

function toggleCell(x, y) {
  //make sure the cell you're toggling is in the grid
  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
    else {
      grid[y][x] = 0;
    }
  }
}