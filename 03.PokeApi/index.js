//? CONSUMIR LA POKEAPI: https://pokeapi.co/
//? ENDPOINT: https://pokeapi.co/api/v2/pokemon/

//* 1) TRAER A LOS PAQUETES QUE INSTALAMOS

const request = require ('request')

//* 2) CREAR/DECLARAR NUESTRA URI 

const URI = 'https://pokeapi.co/api/v2/pokemon/'

//* 3) CREAR UNA FUNCION QUE ME PIDA EL NOMBRE DE UN POKEMON Y ME DEVUELVA SU TIPO

function getPokemon (name) {
    request(URI + name , function(error,response,body) {
        // hacemos una validación
        if(response.statusCode === 200){
            const dataEnFortamoJson = JSON.parse(body) // EL OBJETO EN FORMATO JSON / DEBO PASARLO A UN OBJETO DE JAVASCRIPT
          const typePokemon = dataEnFortamoJson.types.map((objeto)=>objeto.type.name)
          console.log(`El tipo de pokemon de ${name} es: ${typePokemon}`)
        }else{
            console.log(`ocurrio un error: ${response.statusCode} ${response.statusMessage}`)
        }                                  //!       404                 NOT FOUND
    })
}

getPokemon('pikachu')
getPokemon('bulbasaur')
getPokemon('charmander')
