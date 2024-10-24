//OBJECTES
const obj_empezar= document.getElementById("empezar");
const obj_borrar= document.getElementById("borrar");
const obj_nom = document.getElementById("nom");
const obj_info_puntuacio = document.getElementById("info_puntuacio");
const obj_info_navegador = document.getElementById("info_navegador");
const obj_info_url = document.getElementById("info_url");

//EVENTS
obj_empezar.addEventListener("click", empezarPartida);
obj_borrar.addEventListener("click", borrarPartida);


function crearButons(){
    const buto = document.createElement("button");
    boto.id="b1";
    boto.textContent = "A";
}