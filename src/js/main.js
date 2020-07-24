let population = 25;
let lifespam = 250;

function setup() {
  createCanvas(700, 500);
  population = new Population(25, 250);
}

function draw() {
  background(0);
  population.run();
}
