
var URI_IMAGENES = "https://api.nasa.gov/planetary/apod?"
var URI_ASTEROIDES = "https://api.nasa.gov/neo/rest/v1/feed?"

//const API_KEY = "KGNIFQJ3PRYtndGGK4hHgTqxfvHYh3zjByrWYgh5";
const API_KEY = "DEMO_KEY";

window.onload = function(){
    var dia = new Date()
    document.getElementById("fecha").value = dia.toISOString().substring(0,10)
}

async function cambiarImagen()
{
    var dia = document.getElementById("fecha").value;// YYYY-MM-dd
    // "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2022-10-26"
    var datos = await fetch(URI_IMAGENES + 
        "api_key=" + API_KEY +
        "&date="+dia)
        // Aqui se maneja puros datos devueltos a la promesa
        .then(function(respuesta){
            if(respuesta.status !== 200)
                alert("No se pudo")
            return respuesta.json();
        });
    // Aqui se maneja el objeto promesa
    // datos = datos.json();
    // datos = datos[1];
    console.log(datos);

    // Solo para HTML, document es una variable que guarda toda la informacion referente a tu
    // página WEB
    document.getElementById("imagen").style = 
        "background-image: url("+datos.url+");width: 100%; height:400px;";
    document.getElementById("titulo").innerText = datos.title;
    document.getElementById("texto").innerText = datos.explanation;

}

function anterior(){
    var dia = new Date(document.getElementById("fecha").value);
    dia.setDate(dia.getDate()-1)
    document.getElementById("fecha").value = dia.toISOString().substring(0,10)
    document.getElementById("fecha").onchange()
}

function siguiente(){
    var dia = new Date(document.getElementById("fecha").value);
    dia.setDate(dia.getDate()+1)
    document.getElementById("fecha").value = dia.toISOString().substring(0,10)
    document.getElementById("fecha").onchange()
}

async function consultarAsteroides()
{
    // YYYY-MM-DD
    var fechaInicio = document.getElementById("fechaInicioAsteroides").value;
    var fechaFin = document.getElementById("fechaFinAsteroides").value;

    // Podemos usar 
    // - await fetch
    // - .then()
    fetch(URI_ASTEROIDES +
        "start_date=" + fechaInicio +
        "&end_date=" + fechaFin +
        "&api_key=" + API_KEY)
    .then(function(resultado){
        if (resultado.status === 200)
            return resultado.json()
        else
            throw new Error("Ocurrio algo mal")
    })
    .then(function(data){
        // data["near_earth_objects"]
        data.near_earth_objects

        //Cada uno de los objetos tiene como llave el dia en formato:
        // YYYY-MM-DD
        let fechaInicioDate = new Date(fechaInicio)
        let fechaFinDate = new Date(fechaFin)

        // Date se representa en ms
        // 86400000 = 24*60*60*1000
        // new Date("1970-01-01")+ 500 = 0 + 500
        // el 500 representa ms 

        // new Date("2022-10-31")
        // x*86400000

        // new Date("2022-11-01")
        // y* 86400001
        // (y+1) * 86400001

        // DiaInicial hasta DiaFin
        // YYYY-MM-DD Dia Hora
        // YYYY-MM-DD
        // 2022-10-11 -> 2022-10-10
        //
        //fechaInicioDate.setDate(fechaInicioDate.getDate() + 1)
        fechaFinDate.setDate(fechaFinDate.getDate() + 2)

        let asteroides = []

        //while (fechaInicioDate <= fechaFinDate) 
        while(fechaInicioDate.toISOString().substring(0,10) !== 
           fechaFinDate.toISOString().substring(0,10))
        {
            let asteroidesOirignal = data.near_earth_objects[fechaInicioDate.toISOString().substring(0,10)]
            //Mucho cuidado
            if(asteroidesOirignal === undefined){
                console.log(fechaInicioDate)
                fechaInicioDate.setDate(fechaInicioDate.getDate() + 1)
                continue;
            }
            console.log(asteroidesOirignal)

            //Filtrar los asteroides que son peligrosos
            
            // Cuidado, no hacer push de una lista completa, ya que queda así: [ [O1,O2,O3] ]
            //asteroides.push(data.near_earth_objects[fechaInicioDate.toISOString().substring(0,10)])
            asteroidesOirignal.forEach(asteroide =>{
                asteroides.push(asteroide)
            })

            fechaInicioDate.setDate(fechaInicioDate.getDate() + 1)
        }
        console.log("Terminé")

        return asteroides
    }).then(function(asteroides){
        //console.log(asteroides)
        document.getElementById("infoTabla").innerHTML = ""
        
        asteroides.forEach(asteroide =>{
            document.getElementById("infoTabla").innerHTML += 
            `
            <tr>
                <td>${asteroide.name}</td>
                <td>${asteroide.close_approach_data[0].close_approach_date}</td>
                <td>${asteroide.close_approach_data[0].relative_velocity.kilometers_per_hour} km/h</td>
                <td>${asteroide.nasa_jpl_url}</td>
            </tr>
            `
        })
    }).catch(function(error){
        alert(error);
    })
}




/**
 * "2022-10-31" + 1
 * "2022-10-311"
 * 
 * "2022-10-311" + 1
 * "2022-10-3111"
 * 
 */