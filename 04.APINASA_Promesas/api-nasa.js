
var URI_IMAGENES = "https://api.nasa.gov/planetary/apod?"
//const API_KEY = "KGNIFQJ3PRYtndGGK4hHgTqxfvHYh3zjByrWYgh5";
const API_KEY = "DEMO_KEY";

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
