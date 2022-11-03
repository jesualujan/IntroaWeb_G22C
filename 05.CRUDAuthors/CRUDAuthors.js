//? VAMOS A TENER NUESTRA LÓGCA 
//? DOCUMENTACIÓN DE LA API: https://goodreads-devf-aaron.herokuapp.com/docs/
//? URI DE LA API: https://goodreads-devf-aaron.herokuapp.com/api/v1/authors/

//* 1) TRAER A REQUEST QUE ES EL PAQUETE QUE ACABAMOS DE INSTALAR 

const request = require ('request')

//* 2) DECLARAR NUESTRA URI 

const URI = 'https://goodreads-devf-aaron.herokuapp.com/api/v1/authors/'

//? LISTAR A TODOS LOS AUTORES  (authors)

    const getAuthors = () => {
        request.get(URI , (error,response,body) => {
            //validamos nuestra petición
            if(response.statusCode === 200){
                const authors = JSON.parse(body) // el objeto json convertirlo a un obj de javascript
                console.log(authors)
            }else {
               console.log(response.statusCode, response.statusMessage)  
            }               //!  404                  Not Found 
        })
    }

//? LISTAR UN AUTOR POR SU ID 

    const getAuthor = (id) => {
        request.get(URI+id+'/', (error,response,body) =>{
            //validamos nuestra petición
            if(response.statusCode === 200){
                const author = JSON.parse(body) 
                console.log(author)
            }else{
                console.log(response.statusCode, response.statusMessage)
            }                 //!  404                  Not Found
        })
    }

 //? CREAR UN AUTOR - USAMOS UN OBJETO CON IFORMACIÓN/DATA A CREAR Y PARA ELLO NECESITAMOS 
 //? USAR UN FORMATO JSON  
 
    const createAuthor = (jsonData) => {
        const objConfig = {
            url: URI, //APARTADO PARA CREAR EL AUTOR /api/v1/authors/
            form: jsonData // ESTA ES MI DATA EN FORMATO JSON 
        }

        request.post(objConfig , (error,response,body) => {
            //validamos nuestra petición
            if(response.statusCode === 201){
                const createAuthor = JSON.parse(body)
                console.log("AUTOR CREADO CON ÉXITO: " + "\n", createAuthor)
            }else{
                console.log(response.statusCode, response.statusMessage)
            }                  //! 404                NOT FOUND (xk la ruta está mal)
                               //! 400                BAD REQUEST (opción no valida)
        })
    }


//? PARTIAL UPDATE DE UN AUTOR 

    const patchAuthor = (id, jsonData) => {
        const objConfig = {
            url: URI+id+'/',
            form: jsonData
        }

        request.patch(objConfig,(error,response,body)=>{
            //validamos nuestra petición
            if(response.statusCode === 200){
                const patchAuthor = JSON.parse(body)
                console.log("ACTUALIZACIÓN COMPLETA: "+"\n",patchAuthor)
            }else{
                console.log("UPS! ALGO SALIO MAL ", response.statusCode, response.statusMessage)
            }                                         //! 404                NOT FOUND (xk la ruta está mal)
        })                                            //! 400                BAD REQUEST (opción no valida)
    }

//* ELIMINAR UN AUTOR
const deleteAuthor = (id)  => {
    request.delete(URI+id+'/' , (error,response,body)=>{
        //validamos nuestra petición
        if(response.statusCode === 204){
            console.log("EL AUTOR FUE ELIMINADO EXITOSAMENTE")
        }else{
            console.log(response.statusCode,response.statusMessage)
        }                 //! 404                NOT FOUND
    })
}


    module.exports = {
        getAuthors, 
        getAuthor, 
        createAuthor, 
        patchAuthor,
        deleteAuthor
    }