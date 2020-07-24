class Population {
  constructor(popSize, lifespam) {
    this.popSize = popSize;
    this.rockets = [];
    for (let i = 0; i < popSize; i++) this.rockets[i] = new Rocket(lifespam);
  }

  run() {
    for (let i = 0; i < this.popSize; i++) {
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }
}
