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

















    module.exports = {
        getAuthors,
        getAuthor
    }