class Target {
  constructor(x, y, size) {
    this.pos = createVector(x, y);
    this.size = size;
    console.log("aaa");
  }

  draw() {
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
}
