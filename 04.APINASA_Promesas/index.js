

// let promesa = new Promise(function(resolve, reject){
//     let x = Math.random()*10;
//     if(x > 5){
//         resolve(x);
//     }else{
//         reject(new Error("No están grande el número: "+ x));
//     }
// })

// promesa.then(function(numero){
//     console.log(numero);
// }).catch(function(error){
//     console.error(error);
// })

let promesa = new Promise(function(resolve, reject){
    try {
        // Mas procesamiento o mas código
        let datos = {
            "estado": 200,
            "datos": [1,2,3,4,5,6,7,8]
        }

        if(datos.estado === 200){
            // Lo va a pasar a la primera funcion "then"
            resolve(datos)
        }else{
            // Lanza la promesa por los aires
            //(╯°□°)╯︵ ┻━┻
            throw new Error("Algo salio mal")
        }

    } catch (error) {
        reject()
    }
})

promesa.then(function(datos){
    // Aqui nuestros datos son crudos
    console.log(datos)

    //Regresar unicamente los datos que nos interesan
    //return datos.datos
    return datos["datos"] //Pasan al siguiente then
}).then(function(numeros){
    let resultado = 0;
    if(!Array.isArray(numeros))
    {
        //(╯°□°)╯︵ ┻━┻
        throw new Error("No es una lista")
    }
    numeros.forEach(function(numerito){
        resultado += numerito;
    })
    return resultado //Pasa al siguiente then
})
.then(function(resultado){
    console.log("El resultado es: "+ resultado)
})
.catch(function(error){
    console.error(error)
})

//.then(resolve, reject)
// resolve => tu procesamiento normal
// reject => solo en caso de que algo salga mal
// Para que algo salga mal, tu tienes explicitamente
// que colocar ese error.
function sumarNumeros(listaNumeros){
    return new Promise(function(resolve, reject){
        try {
            // Mas procesamiento o mas código

            // if(!Array.isArray(listaNumeros)){
            //     throw new Error("No es una lista de números")
            // }
            listaNumeros.forEach(function(numerito){
                if (typeof numerito !== 'number'){
                    throw new Error("No todos los valores son números")
                }
                
            })
            for (let i = 0; i < listaNumeros.length; i++) {
                listaNumeros[i] = listaNumeros[i]*2;
            }
            console.log(listaNumeros)
    
            // Lo va a pasar a la primera funcion "then"
            // {"estado": 200, "datos":[1,2,3,4]}
            // Aqui ya no pasamos el objeto
            resolve(listaNumeros)

        } catch (error) {
            reject()
        }
    })
}
/**
 * [[1,2,3,4,5], 5, "nombre"]
 */
sumarNumeros([1,2,3,4,5])
.then(function(datos){
    // Aqui nuestros datos son crudos
    console.log(datos)
    //Regresar unicamente los datos que nos interesan
    //return datos.datos
    return datos//Pasan al siguiente then
}).then(function(numeros){
    let resultado = 0;
    numeros.forEach(function(numerito){
        resultado += numerito;
    })
    return resultado //Pasa al siguiente then
})
.then(function(resultado){
    console.log("El resultado es: "+ resultado)
})
.catch(function(error){
    console.error(error)
})

sumarNumeros([1,2,3,4,5])
.then(function(datos){
    // Aqui nuestros datos son crudos
    console.log(datos)
    //Regresar unicamente los datos que nos interesan
    //return datos.datos
    return datos//Pasan al siguiente then
}).then(function(numeros){
    let resultado = 0;
    numeros.forEach(function(numerito){
        resultado += numerito;
    })
    return resultado //Pasa al siguiente then
})
.then(function(resultado){
    console.log("El resultado es: "+ resultado)
})
.catch(function(error){
    console.error(error)
})

/**
 * musica = [1,...,24000]
 * Filtro(musica)
 * 
 * new Promise(function(){
 *  var contador = 0
 *  musica.forEach(valor => {
 *      contador++;
 *      valor = x*x*x*x*x*x + 60*x + 200;
 *      document.getElementByIndex("barraProgreso").value = contador/musica.length
 *  })
 * })
 * 
 */



 const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function obtener1 (){
    const datos = await fetch("https://google.com")
    console.log(datos)
}

async function obtener2 (){
    fetch("https://google.com").then(function(datos){
        console.log(datos)
    });
}

obtener1()
obtener2()