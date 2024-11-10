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
const bcc = new BroadcastChannel('canal');
let estadoGame = "No hi ha cap partida en joc";
const userAgent = navigator.userAgent;



/****************************************************************** FUNCIONALITATS ********************************************************/

function empezarPartida(){
    if(obj_nom.value){
        pagina = window.open('joc.html');
        document.cookie ="username=" + obj_nom.value;               //Guardamos el nombre en una cookie
    }else{
        alert(`Has d'introduir el nom del jugador`);
    }
}


function borrarPartida(){

    localStorage.removeItem("localpunts");
    localStorage.removeItem("localjugador");
    obj_nom.value="";
    pagina.close('joc.html');                                        //cerramos la ventana de juego
    obj_info_puntuacio.textContent =  "No hi ha cap partida en joc"; //actualizamos el estado

}


function infoNavegador(){                                           //Extracció de la info del Navegador
    obj_info_navegador.textContent = userAgent;
}



function infoURL(){                                                 //Extracció de la info de la url
    const url = location.origin;
    obj_info_url.textContent = url;
}



/*******************************************  Comunicació entre pàgines a través de un canal (BroadcastChannel ) **********************************************/

function canalInfo() {
    bcc.onmessage = (event) => {
        if (event.data) {
            const jugador = event.data.jugador;
            const puntos = event.data.puntos;
            const estado = event.data.estado;
        
            if (estado === "No hi ha cap partida en joc") {
                obj_info_puntuacio.textContent = estado;
            }else {
                obj_info_puntuacio.textContent = `NOM: ${jugador}, PUNTS: ${puntos}, ESTAT PARTIDA: ${estado}`;
            }
        }
    };
}



/*********************************************************  El color de fondo será diferente dependiendo del Navegador  *************************************/

function colorNavegador(){

    if (userAgent.includes("Chrome")) {
        document.body.style.backgroundColor = 'rgb(164, 237, 165)';
    } else if (userAgent.includes("Mozilla")) {
        document.body.style.backgroundColor = "orange"; 
    }
}



/************************************************************* Funcions que les activem automàticament ********************************************************/

colorNavegador();
infoNavegador();
infoURL();
canalInfo();