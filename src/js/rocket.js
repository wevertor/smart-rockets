class Rocket {
  constructor(lifespan, target, _dna) {
    this.count = 0;

    this.pos = createVector(width / 2, height);
    this.vel = createVector();
    this.acc = createVector();
    this.target = target;

    this.dna = _dna || new Dna(lifespan);

    this.fitness = 0;
    this.timeToArrive = 0;
    this.completed = false;
    this.crashed = false;
  }

  applyForce = (force) => this.acc.add(force);

  getDistanceToTarget = () =>
    dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y);

  update() {
    // movimento
    this.applyForce(this.dna.genes[this.count]);

    // diminui o tempo de vida
    this.count++;

    // verifica se chegou
    this.haveCompleted();

    // verifica se bateu
    this.haveCrashed();

    // movimento
    if (!this.completed && !this.crashed) {
      this.pos.add(this.vel);
      this.vel.add(this.acc);
      this.acc.mult(0);
    }
  }

  show() {
    push();
    noStroke();
    fill(255, 150);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0, 0, 30, 5);
    pop();
  }

  calculateFitness() {
    this.fitness = 1 / Math.pow(this.getDistanceToTarget(), 4);

    if (this.completed) {
      this.fitness *= 20;
      this.fitness *= this.calcTimeAchieved;
    }
    if (this.crashed) this.fitness /= 10;
  }

  haveCrashed() {
    // Screen crash
    if (
      this.pos.x < 0 ||
      this.pos.x > width ||
      this.pos.y < 0 ||
      this.pos.y > height
    )
      this.crashed = true;
  }

  haveCompleted() {
    let lifespan = this.dna.lifespan;

    if (this.getDistanceToTarget() < target.size) {
      if (!this.completed) {
        this.timeToArrive = this.count;

        let calc = Math.pow(
          //
          map(lifespan - this.timeToArrive, 0, lifespan, 1, 10),
          6
        );
        this.calcTimeAchieved = calc;
      }

      this.completed = true;
    }
  }
}
