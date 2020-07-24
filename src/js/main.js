const populationSize = 25;
const lifespam = 500;

let target;
let population;
let count;

function setup() {
  createCanvas(700, 500);

  count = 0;
  target = new Target(width / 2, 80, 32);
  population = new Population(populationSize, lifespam, target);
}

function draw() {
  background(0);
  count++;

  if (count === lifespam) {
    population.evaluate();
    console.log(population.rockets);
    population.selection();

    count = 0;
  }

  population.run();
  target.draw();
}
