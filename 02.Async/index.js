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
  for(var i=1; i<=9; i++){
    console.log(`${x}*${i}= ` + i*x)
  }
}
  
multiplicar(2)

/** Función Concurrente */
function realizarOperacion(miFuncion)
{
  var numero = 8;

  numero = numero + 2;

  miFuncion(numero);

  numero = numero + 2;

  miFuncion(numero);
}

realizarOperacion(multiplicar);

/** 
 * Ejemplo de Asincronismo con setTimeout
 * Recordemos que la función recibe:
 *  setTimeout(
 *    <nombre de función>, 
 *    <tiempo en milisegundos>, 
 *    <parámetros para la función a ejecutar divididos por comas>
 *  )
 */
var segundos = 10;

setTimeout(multiplicar, 4000, 3)
setTimeout(sumar, 2000, 6,9)
console.log("Hola")
console.log("Hola2")

/** Función asíncrona que genera su espacio de trabajo */
async function dividir(x, y)
{
  var resultado = (x/y)
  console.log("La division es: " + resultado)
}

/** 
 * Recordemos que usar 'for' con muchas iteraciones bloqueará
 * el hilo de JS dejando paralizado tu programa por la prioridad
 * del 'Event Loop'. Es mejor usar un timeout y una función callback
 * para esperar algunos segundos.
 * */
async function iterar()
{
  setTimeout(multiplicar, 1000, 7)
}

/**
 * En este ejemplo vemos que 'setTimeout' se ejecutará
 * después que 'dividir', pues al irse a dormir, esperará
 * a que termine el tiempo en la cola de ejecución.
 */
setTimeout(sumar, 2000, 4,5)
dividir(25,5)

/** 
 * Si deseamos esperar a que termine una función
 * lo podemos hacer con la palabra reservada await,
 * la cual nos permite esperar a que termine de ejecutar 
 * la promesa. ¡¡OJO!! Hay ocaciones en que await solo
 * espera a la finalización de la función. Si no se coloca
 * explicitamente una Promesa es posible que no espere
 * a que termine todos los procesos asíncronos de la función.
 */
async function ejemploEsperar()
{
  await esperar(8000)
  sumar(5,4)
  await esperar(2000)
  sumar(50,7)
  console.log("Ya termine")
}

ejemploEsperar()

function esperar(tiempo){
  return new Promise((cb)=>{
    /** 
     * Recuerda que un error en la lógica no necesariamente 
     * detiene a JS y por lo tanto la promesa tiene una
     * respuesta exitosa.
     * */
    var fallo = 0/0;
    setTimeout(cb, tiempo);
  })
}

/** 
 * Podemos crear explicitamente una promesa de la siguiente forma
 * y en caso de que algo salga mal, lanzamos un error con 
 * 'new Error(<mensaje>)'. Lo cual fuerza a la promesa a terminar
 * en la función catch si es que la utilizamos.
 * Recuerda que las funciones deben tener el nombre 'resolve' y 'reject'
 * para que se tomen en cuenta como los estados de terminado o
 * rechazado. En este caso le enviamos el error a la función
 * reject que se ejecutará en catch.
 */

const promise = new Promise(
  function (resolve, reject){
    const numero = Math.random()*10;
    setTimeout(
      /** Operacion ternaria
       * <condicion> ? <accion en caso de verdadero> : <accion en caso de falso>
       * Si nuestro número NO es mayor a 5, lanzamos un error que
       * será manejado en la función catch.
       */
      ()=> (numero > 5) ? 
      resolve(numero) :
      reject(new Error('El número '+ numero +' no es mayor a 5'.bgBlue))
      
    )
  }
);


/** 
 * Debido a que 'resolve' y 'reject' son funciones predeterminadas
 * para marcar el término o fallo de una promesa reciben únicamente
 * los siguientes datos:
 * - resolve(<datos proporcionados desde la ejecución de la promesa>)
 * - reject(<razón en forma de 'new Error(<mensaje>)'>)
 * Si deseas especificar algún dato extra en resolve, asegurate de 
 * colocar en la función de la promesa un 'return <datos>'.
 * Si deseas especificar algún dato en el error, envíalo desde el 
 * mensaje de 'new Error(<mensaje>)'. No lo podrás manipular, pero
 * puede ser útil al momento de resolver errores.
 */
promise
.then(
  numero => console.log(numero)
).catch(
  error => {
    console.error(error)
  }
)

/**
 * Recuerda que si usas Math.random() en una promesa
 * solo se invocará una vez y será el mismo número y
 * semilla durante todas las veces que invoques dicha
 * promesa
 */
for (let index = 0; index < 20; index++) {
  promise
  .then(
    numero => console.log(numero)
  ).catch(
    (erro, data) => console.error(erro)
  )
}

/** 
 * Para esperar a que termine una promesa podemos
 * utilizar la función del objeto Promise 'then'
 * que obliga a esperar a que termine todo el contenido
 * de la función de la promesa, para después ejecutar
 * la función anonima que dimos en 'then'
 */

esperar(4000).then(
  ()=> console.log("Me espere 4 segundos")
).catch(
  () => console.error("Falle")
);


/**
 * ¡Cuidado! En ocaciones JS no da errores y continua sin tomar
 * en cuenta un error, dando la posibilidad de regresar datos
 * vacíos:
 * {}
 * 
 * Siempre asegurate de que por lo menos tenga un estado y si no
 * lo regresa un estado, asegurate de validar que te regrese un
 * objeto:
 * {
 *  "Estado": "Error"
 * } 
 */

const promesaValidada = new Promise(function(resolve, reject){
  /** Función sin datos de retorno */
  setTimeout(()=>resolve())
})
promesaValidada.then(function(data){
  if(!data){
    data = {"estado":"Error"}
  }
  return data
}).then(function(dataValidada){
  console.error(("Datos: "+dataValidada).bgBlue)
  console.error(("Estado: "+dataValidada.estado).bgRed)
})


/**
 *      ¡¡¡RETOOOO!!!
 * 
 * Crear una funcion asíncrona que genere promesas con timepos de 
 * espera diferentes. Al final, debe hacer alguna de las operaciones
 * antes programadas (sumar, multiplicar, dividir)
 * Pistas:
 * - Usar Math.random() y Math.floor() para el tiempo
 * - 
 */