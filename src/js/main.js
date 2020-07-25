const populationSize = 25;
const lifespam = 500;

let target;
let population;
let obstacles;
let count;

function setup() {
  createCanvas(700, 500);

  count = 0;
  target = new Target(width / 2, 80, 32);
  population = new Population(populationSize, lifespam, target);
  obstacles = [];
}

function draw() {
  background(0);
  count++;

  if (count === lifespam) {
    population.evaluate();
    population.selection();

    count = 0;
  }

  population.run();
  target.draw();

  obstacles.forEach((obstacle) => {
    obstacle.draw();
  });
}

function mouseClicked() {
  obstacles.push(new Obstacle(mouseX, mouseY, 40, 20));
}
