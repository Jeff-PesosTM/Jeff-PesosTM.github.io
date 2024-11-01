// grady's minesweeper project
//10/22/2024

//extra for experts: even listeners to prevent some default functions, using classes to build cells

//features: right click to flag, you cant lose on the first move

//things to work on: polishing with css stuff

///////////////////////////////////////////////////////////////////////////////////

let bombAmount = 0;
let bombSprite;
let musicLoop;
let grid;
let cellSize;

let isFirstClick = true;
let gameLost = false;
let gameWon = false;

const GRID_SIZE = 16;

addEventListener("contextmenu", rightClick, false);

function preload() {
  bombSprite = loadImage("assets/bomb.png");
  flagSprite = loadImage("assets/flag.png");
  tileSprite = loadImage("assets/tile.jpg");
}

function setup() {
  //creates largest square within window
  if (windowHeight < windowWidth) {
    createCanvas(windowHeight*0.9, windowHeight*0.9);
  }
  else {
    createCanvas(windowWidth*0.9, windowWidth*0.9);
  }

  grid = createArray(GRID_SIZE);
  cellSize = floor(width / GRID_SIZE);
  startGame();
}

function draw() {
  background(255);
  displayGrid();
  checkMousePress();
  gameOver();
  checkGameWin();
}


class Cell {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.isRevealed = false;
    this.isBomb = false;
    this.neighbourAmount = 0;
    this.neighbourColors = ["blue", "green", "red", "purple", "maroon", "turquoise", "black", "grey"];
    this.flag = false;
  }
  
  //randomly creates bombs within the grid
  createBomb() {
    if (random(100) > 85) {
      this.isBomb = true;
      bombAmount++;
    }
    else {
      this.isBomb = false;
    }
  }

  //displays cells in the grid
  showCells() {
    stroke(0);

    //blank tile
    image(tileSprite, this.x, this.y, this.size, this.size);

    //flag sprite
    if (this.flag && gameLost === false) {
      image(flagSprite, this.x, this.y, this.size, this.size);
    }

    if (this.isRevealed) {
      //bombs sprite revealed
      if (this.isBomb) {
        image(bombSprite, this.x, this.y, this.size, this.size);
      }
      else {
        //other revealed
        fill("lightgrey");
        rect(this.x, this.y, this.size, this.size);

        //text of neighbours
        if (this.neighbourAmount > 0) {
          fill(this.neighbourColors[this.neighbourAmount-1]);
          textAlign(CENTER);
          textSize(cellSize/2);
          text(this.neighbourAmount, this.x + this.size/2, this.y+ this.size/1.5);
        }
      }
    }
  }
  
  //sets the cell's value isRevealed to true, if the cell has no neighbours flood fill function is run
  revealCells() {
    this.isRevealed = true;
    if (this.neighbourAmount === 0) {
      this.floodFillAlgorithm();
    }
  }

  //checks adjacent cells and their states
  checkAdjacentCells() {
    let neighbourCounter = 0;
    
    if (this.isBomb) {
      return this.neighbourAmount = -1;
    }

    // checks from a range of -1 to 1 adjacent cells of the cell to count the number of neighbours it shares
    for (let adjX = -1; adjX < 2; adjX++) {
      for (let adjY = -1; adjY < 2; adjY++){
        //the x/y is used to find the index value of the adjacent cells
        let x = this.x/this.size + adjX;
        let y = this.y/this.size + adjY;

        //sanity check
        if (x > -1 && x < GRID_SIZE && y > -1 && y < GRID_SIZE) {
          //counts bomb neighbours
          let adjacentCell = grid[x][y];
          if(adjacentCell.isBomb) {
            neighbourCounter++;
          }
        }
      }
    }
    //"returns" the amount of neighbours of the individual cell
    this.neighbourAmount = neighbourCounter;
  }

  floodFillAlgorithm() { //similar to checkAdjacentCells();
    for (let adjX = -1; adjX < 2; adjX++) {
      for (let adjY = -1; adjY < 2; adjY++){
        //the following is used to find the index value of the adjacent cells of [y][x]
        let x = this.x/this.size + adjX;
        let y = this.y/this.size + adjY;

        //sanity check
        if (x > -1 && x < GRID_SIZE && y > -1 && y < GRID_SIZE) {
          let adjacentCell = grid[x][y];
          //if the adjacent cell isn't revealed and isn't a bomb, reveal the cell
          if (!adjacentCell.isRevealed && !adjacentCell.isBomb) {
            adjacentCell.revealCells();
          }
        }
      }
    }
  }
  //checks if mouse is hovering on the boundaries of a cell
  mouseOnCell(x, y) {
    return x > this.x && x < this.x + this.size && y > this.y && y < this.y + this.size;
  }
}

// Will check for mouse presses on grid, (x,y) will be tested by mouseX, mouseY
function checkMousePress() {
  if (mouseIsPressed) {
    if (mouseButton === LEFT) {
      for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++){
          if (grid[y][x].mouseOnCell(mouseX, mouseY)) {
            if (isFirstClick) {
              if (grid[y][x].isBomb) {
                grid[y][x].isBomb = false;
                bombAmount--;
                for (let i = -1; i < 2; i++) {
                  for (let j = -1; j < 2; j++){
                    grid[y + i][x + j].checkAdjacentCells();
                  }
                }
              }
              else {
                grid[y][x].revealCells();
                //if mouse pressed on bomb game is lost
                if (grid[y][x].isBomb) {
                  gameLost = true;
                  gameOver();
                }
              }
              isFirstClick = false;
            }
            else {
              grid[y][x].revealCells();
              //if mouse pressed on bomb game is lost
              if (grid[y][x].isBomb) {
                gameLost = true;
                gameOver();
              }
            }
          }
        }
      }
    }
    else if (mouseButton === RIGHT) {
      for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++){
          if (grid[y][x].mouseOnCell(mouseX, mouseY)) {
            grid[y][x].flag = true;
          }
        }
      }
    }
  }
}

//creates a new 2d array 
function createArray(howLarge) {
  let newArray = [];
  for (let y = 0; y < howLarge; y++) {
    newArray.push([]);
  }
  return newArray;
}

function displayGrid() {
  //displays the grid
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++){
      grid[y][x].showCells();
    }
  }
  if (keyIsDown(82)) {
    startGame();
  }
}

function gameOver() {
  //displays the game over text on game lost
  if (gameLost) {
    fill("red");
    textAlign(CENTER);
    textSize(width/10);
    text("boom", width/2, height/2);
    fill("yellow");
    textSize(width/30);
    text("Press R to play again!", width/2, height/1.8);
    //reveals remaining tiles and reset if user presses "r"
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++){
        grid[y][x].isRevealed = true;
      }
    }
  }
}

function checkGameWin() {
  let openedCount = 0;
  if (gameWon) {
    fill("blue");
    textAlign(CENTER);
    textSize(width/10);
    text("you win!", width/2, height/2);
  }
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (!grid[y][x].isBomb && grid[y][x].isRevealed) {
        openedCount++;
      }
    } 
  }
  if (GRID_SIZE * GRID_SIZE - bombAmount === openedCount && !gameLost) {
    gameWon = true;
  }
}

//used during setup, and when game is reset
function startGame() {
  gameLost = false;
  isFirstClick = true;
  gameWon = false;
  bombAmount = 0;
  //creates cell objects and randomizes bomb placement
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      grid[y][x] = new Cell(y*cellSize, x*cellSize, cellSize);
      grid[y][x].createBomb();
    } 
  }

  //check adjacent cells in the grid (neighbours)
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      grid[y][x].checkAdjacentCells();
    } 
  }
}

//prevents right click from
function rightClick(event) {
  event.preventDefault();
}