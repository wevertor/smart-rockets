class Population {
  constructor(popSize, lifespan, target) {
    this.popSize = popSize;
    this.rockets = [];
    this.matingPool = [];
    this.lifespan = lifespan;
    this.target = target;

    for (let i = 0; i < popSize; i++)
      this.rockets.push(new Rocket(lifespan, target));
  }

  evaluate() {
    let maxFitness = 0;
    this.rockets.forEach((rocket) => {
      rocket.calculateFitness();
      if (rocket.fitness > maxFitness) maxFitness = rocket.fitness;
    });

    this.matingPool = [];

    this.rockets.forEach((rocket) => {
      // normaliza os valores
      rocket.fitness /= maxFitness;

      // aumenta probabilidade de reprodução dos melhores
      let n = rocket.fitness * 100;
      for (let i = 0; i < n; i++) this.matingPool.push(rocket);
    });
  }

  selection(_mutationLevel) {
    let mutationLevel = _mutationLevel || 0.05;
    let newRockets = [];

    this.rockets.forEach((rocket) => {
      // escolhe o dna dos pais aleatoriamente
      let parentA = random(this.matingPool).dna;
      let parentB = random(this.matingPool).dna;

      let child = parentA.crossover(parentB);
      child.mutation(mutationLevel);

      newRockets.push(new Rocket(this.lifespan, this.target, child));
    });

    this.rockets = newRockets;
  }

  run() {
    this.rockets.forEach((rocket) => {
      rocket.update();
      rocket.show();
    });
  }
}
