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

    if (localStorage.getItem("partidaActiva") === "true"){          //Verificamos si ya hay una ventana de juego activa previamente
        pagina = window.open('joc.html');                           //si la hay, abrimos y cerramos el nuevo juego, y mostramos alerta
        alert("Hi ha una partida començada"); 
        pagina.close();                                             
    }

    if(obj_nom.value){
        pagina = window.open('joc.html');
        document.cookie ="username=" + obj_nom.value;               //Guardamos el nombre en una cookie
        localStorage.setItem("partidaActiva", "true");              //Decimos que ya hay una partidaActiva
    }else{
        alert(`Has d'introduir el nom del jugador`);
    }
}


function borrarPartida(){

    localStorage.removeItem("localpunts");
    localStorage.removeItem("localjugador");
    obj_nom.value="";
    localStorage.setItem("partidaActiva", "false");                     //decimos que ya no hay partida activa

    if (pagina && !pagina.closed) {
    pagina.close('joc.html');                                           //cerramos la ventana de juego activa si existe y no está cerrada
    }      
                          
    obj_info_puntuacio.textContent =  "No hi ha cap partida en joc";    //actualizamos el estado
}


function infoNavegador(){                                               //Extracció de la info del Navegador
    obj_info_navegador.textContent = userAgent;
}



function infoURL(){                                                     //Extracció de la info de la url
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

            if (estado === "Partida Finalitzada") {                 //Si finalizamos una partida, partidaActiva a false para que se pueda empezar otra partida 
                localStorage.setItem("partidaActiva", "false");     // y no salte el alert de que ya hay una partida empezada
            }
        
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