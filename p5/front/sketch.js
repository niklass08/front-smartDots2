const smartDotsOptimizer = smartdots2.default;
const WIDTH = 1920 / 2;
const HEIGHT = 1080 / 2;
const INTERNAL_WIDTH = 100;
const INTERNAL_HEIGHT = 100;
let count = 500;
let pos;
let population;
let positions;

const internalToCanvasWidth = x => {
  return (x / INTERNAL_WIDTH) * WIDTH;
};
const internalToCanvasHeight = x => {
  return (x / INTERNAL_HEIGHT) * HEIGHT;
};
function setup() {
  // put setup code here
  console.log(smartdots2);
  createCanvas(WIDTH, HEIGHT);
  background(128);
}

function draw() {
  // put drawing code here
  background(128);
  fill(0, 0, 255);
  ellipse(WIDTH - 8, HEIGHT - 8, 20, 20);
  if (count === 500) {
    count = 0;
    let value;
    for (let i = 0; i < 5; i++) {
      value = smartDotsOptimizer().next().value;
    }
    population = value.popPos;
    positions = value.positions;
    pos = createVector(0, 0);
  }
  //DrawPopulation
  population.forEach(state => {
    fill(0);
    ellipse(internalToCanvasWidth(state[count][0]), internalToCanvasHeight(state[count][1]), 4, 4);
  });

  //Draw BestState
  fill(0, 255, 0);
  ellipse(pos.x, pos.y, 8, 8);
  pos = createVector(internalToCanvasWidth(positions[count][0]), internalToCanvasHeight(positions[count][1]));

  count++;
  if (count === 500) {
    console.log('Canvas last pos -> x: ' + pos.x + ' y: ' + pos.y);
    console.log('internal last position -> x: ' + positions.slice(-1)[0][0] + ' y: ' + positions.slice(-1)[0][1]);
  }
}
