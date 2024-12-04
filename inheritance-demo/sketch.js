// OOP inheritance demo
//12/3/2024

//parent
class Shape {
  constructor(x, y, theColour)  {
    this.x = x;
    this.y = y;
    this.theColour = theColour;
  }

  //common display
  display() {
    noStroke();
    fill(this.theColour);
  }

  //common move
  move() {
    this.x += random(-2, 2);
    this.y += random(-2, 2);
  }
}

//child
class Circle extends Shape {
  constructor(x, y, theColour, radius) {
    super(x, y, theColour);
    this.radius = radius;
  }

  //overide display func
  display() {
    super.display();
    circle(this.x, this.y, this.radius*2);
  }
}

//child
class Square extends Shape {
  constructor(x, y, theColour, size) {
    super(x, y, theColour);
    this.size = size;
  }

  display() {
    super.display();
    square(this.x, this.y, this.size);
  }
}

let shapesArray = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 20; i++) {
    if (random(100) < 50) {
      let theCircle = new Circle(random(width), random(height), color(random(255), random(255), random(255)), random(20, 50));
      shapesArray.push(theCircle);
    }
    else {
      let theSquare = new Square(random(width), random(height), color(random(255), random(255), random(255)), random(20, 50));
      shapesArray.push(theSquare);
    }
  }
}

function draw() {
  background(220);
  for (let aShape of shapesArray) {
    aShape.display();
    aShape.move();
  }
}


