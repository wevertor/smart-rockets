class Dna {
  constructor(lifespan, _genes) {
    this.lifespan = lifespan;

    if (_genes) {
      this.genes = _genes;
    } else {
      this.genes = [];

      for (let i = 0; i < lifespan; i++) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(0.5);
      }
    }
  }

  crossover(other) {
    let newGenes = [];
    let mid = floor(random(this.lifespan));

    // metade de cada pai
    this.genes.forEach((gene, i) => {
      if (i > mid) newGenes[i] = gene;
      else newGenes[i] = other.genes[i];
    });

    return new Dna(this.lifespan, newGenes);
  }

  mutation(mutationLevel) {
    // aleatoriza uma quantidade específica de genes
    this.genes = this.genes.map((gene, i) => {
      if (random(1) < mutationLevel) {
        gene = p5.Vector.random2D();
        gene.setMag(0.5);
      }
      return gene;
    });
  }
}
