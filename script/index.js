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



//VARIABLES I CONSTANTS
let pagina;





//const url = window.location.origin;

const userAgent = navigator.userAgent;


//FUNCIONALITATS

function empezarPartida(){
    if(obj_nom.value){
        pagina = window.open('joc.html');
        //redireccio: location.assign('joc.html')
        sessionStorage.setItem('nomJugador', 'nombreIntroducido');
    }else{
        alert('Has dinformar el nom del jugador');
    }
}

function borrarPartida(){
    pagina.close('joc.html');
}


function infoNavegador(){
    
    obj_info_navegador.textContent = userAgent;
}


function infoURL(){
    const url = location.origin;
    obj_info_url.textContent = url;
}


function colorNavegador(){

    if (userAgent.includes("Chrome")) {
        document.body.style.backgroundColor = 'rgb(164, 237, 165)';
    } else if (userAgent.includes("Mozilla")) {
        document.body.style.backgroundColor = "orange"; 
    }
}

colorNavegador();
infoNavegador();
infoURL();