// grady chovan
//serpinski triangle demo
//12/18/2024


let initialTriangle = [
  {x: 800, y: 50},
  {x: 200, y: 700},
  {x: 1400, y: 700},
];

let clr = ["red", "orange", "yellow", "green", "blue", "purple"];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  serpinski(initialTriangle, 5);
}

function serpinski(points, depth) {
  fill(clr[depth]);
  triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);
  if (depth > 0) {
    //upper
    serpinski([points[0], midpoint(points[0], points[1]), midpoint(points[0], points[2])], depth-1);
    //left
    serpinski([points[1], midpoint(points[0], points[1]), midpoint(points[1], points[2])], depth-1);
    //right
    serpinski([points[2], midpoint(points[2], points[0]), midpoint(points[1], points[2])], depth-1);
  }
}

function midpoint(one, two) {
  let mid= {
    x: (one.x + two.x)/2,
    y: (one.y + two.y)/2,
  };
  return {x: mid.x, y: mid.y};
}
