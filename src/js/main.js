const populationSize = 25;
const lifespan = 500;

let target;
let population;
let obstacles;
let count;

let lifeP;

function setup() {
  createCanvas(700, 500);

  count = 0;
  target = new Target(width / 2, 80, 32);
  population = new Population(populationSize, lifespan, target);
  obstacles = [];

  lifeP = createP().html(`Tempo restante: ${lifespan}`);
}

function draw() {
  background(0);
  count++;
  lifeP.html(`Tempo restante: ${lifespan - count}`);
  if (count === lifespan) {
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
  let destroyClick = false;

  const checkClick = (obstacle) => {
    if (
      mouseX > obstacle.x - obstacle.w / 2 &&
      mouseX < obstacle.x + obstacle.w / 2 &&
      mouseY > obstacle.y - obstacle.h / 2 &&
      mouseY < obstacle.y + obstacle.h / 2
    ) {
      return true;
    }
    return false;
  };

  obstacles.forEach((obstacle, i) => {
    if (checkClick(obstacle)) {
      obstacles.splice(i, 1);
      destroyClick = true;
    }
  });

  if (!destroyClick) obstacles.push(new Obstacle(mouseX, mouseY, 40, 20));
}
