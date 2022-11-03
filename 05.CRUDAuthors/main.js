//? VAMOS A EJECUTAR NUESTRA LÓGICA
//? MAIN ES NUESTRO JS PRINCIPAL

const goodReadsCrud = require('./CRUDAuthors')


//* LISTAR A TODOS LOS AUTORES 
//  goodReadsCrud.getAuthors() 

//* LISTAR UN AUTOR POR SU ID 
//   goodReadsCrud.getAuthor(14917)


//* CREAR UN AUTOR (MANDAR UN JSON)
//     const jsonSEND = {
//         name: "LEO",
//         last_name: "MESSI",
//         nacionalidad: "MX",
//         biography: "FUTBOLISTA PROFESIONAL",
//         gender: "M",
//         age: 35,
//         is_alive: true
//     }
// goodReadsCrud.createAuthor(jsonSEND)

//* PATCH A UN AUTOR 
//     const jsonUpdate = {
//         name: "Itzel",
//         last_name: "Rocha",
//         biography: "CHEF EN PROCESO",
//         gender: "F"
//     }
// goodReadsCrud.patchAuthor(14925, jsonUpdate)

//* ELIMINAR UN AUTOR 
goodReadsCrud.deleteAuthor(14813)