var contador = {
  cont: 0,
  sig: function(){
    aux = this.cont
    this.cont++;
    return aux;
  }
}
console.log(contador.sig())
// → 0
console.log(contador.sig())
// → 1
console.log(contador.sig())
// → 2
