class Dna {
  constructor(lifespam) {
    this.genes = [];
    this.lifespam = lifespam;
    for (let i = 0; i < lifespam; i++) {
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(0.1);
    }
  }
}
