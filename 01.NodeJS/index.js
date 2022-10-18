var colors = require ('colors')

console.log("MODULO DE JAVASCRIPT".yellow)
console.log("CLASES LUNES & MIERCOLES".magenta)
console.log("ACABAMOS DE INSTALAR NODEMON".green)
console.log("BIENVENIDO DAVID A DEVF".bgMagenta)

function sumar(x,y){
    const suma = x+y
      console.log("la suma es: " + suma)
  }
  sumar(2,2)
  
  function multiplicar(x){
    for(i=1; i<=9; i++){
      console.log(`2*${i}= ` + i*x)
    }
  }
  
  multiplicar(2)
  