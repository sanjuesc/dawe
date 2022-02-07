class Punto {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }

  suma(punto){
    this.x = this.x + punto.x;
    this.y = this.y + punto.y;
    console.log("Punto{x: " + this.x + ", y: " + this.y + "}");
  }
}
console.log(new Punto(1, 2).suma(new Punto(2, 1)))
