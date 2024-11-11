//OBJECTES
const obj_instruccions= document.getElementById("instruccions");
const obj_nombre_jugador= document.getElementById("nomJugador");
const puntos = document.getElementById("punts");

const millorJugador = document.getElementById("millorJugador");
const millorPunts = document.getElementById("millorPunts");

//EVENTS
obj_instruccions.addEventListener("click", abrirInstrucciones);


//VARIABLES I CONSTANTS
let pagina;
let cookies;

//JOC
let firstbutton;
let secondbutton;
let contadorParejas = 0;
const MAX_PAREJAS = 10;

let punts = 0;
let maxPunts = 0;
let maxJugador;

const lletres = ['A','B','C','D','E','F','G','H','I','J',]
const lletresContenidor = document.getElementById('joc');


//Navegador
const userAgent = navigator.userAgent;


//Canal BradcastChannel
const bcc = new BroadcastChannel('canal');
let estadoGame = 'En joc';



/****************************************************************** FUNCIONALITATS ********************************************************/

function mostrarNombre(){
    cookies = document.cookie.split('=')[1];            //Usamos .split para dividir la cadena en username y el nombre, 
   obj_nombre_jugador.textContent = cookies;            //y usamos el [1] para acceder a la segunda parte que es el valor nombre
}



function abrirInstrucciones(){ //Funcionalidad del botón para abrir la ventana de instrucciones
    pagina = window.open('instruccions.html','instruccions','width=400,height=400');
}



/*************************************************************************** CREACIÓ DELS BUTTONS DEL JOC **************************************/

function crearButtons(){

    const lletresDuplicades = [...lletres, ...lletres];             //Guardamos en una variable el array de letras 2 veces,
    lletresDuplicades.sort(() => Math.random() - 0.5);              //de forma que lo mezclamos para que sea de forma aleatoria

    //Creamos los botones
    for(let i = 0; i < lletresDuplicades.length; i++){
        const letra = lletresDuplicades[i];
        const crearBoton = document.createElement("button");
        crearBoton.id="boto_" + (i + 1);
        crearBoton.textContent = letra;
        crearBoton.disabled = false;                                //activamos todos los botones
        crearBoton.addEventListener("click",() => jugarLletra(crearBoton));
        lletresContenidor.appendChild(crearBoton);
    }
}


/******************************************************************************* LÓGICA DEL JOC ******************************************************/

function  jugarLletra(lletra) {

    if(!firstbutton){                                                   //sino hay asignación del primer botón lo asignamos y deshabilitamos
        firstbutton = lletra;                                        
        deshabilitarLletra(firstbutton);                               

    }else if (!secondbutton){                                           //sino hay asignación del segundo bóton, lo asignamos y deshabilitamos
        secondbutton = lletra;
        deshabilitarLletra(secondbutton);

        if (firstbutton.textContent === secondbutton.textContent){      //si el contenido de ambos botones coinciden, es decir encontramos pareja
            console.log('Pareja encontrada');
            contadorParejas++;                                          //aumentamos la cantidad de parejas encontradas
            sumarPunts();                                               //sumamos los puntos
            deshabilitarLletra(firstbutton);                            // y deshabilitamos ambos botones
            deshabilitarLletra(secondbutton);
            
            if (contadorParejas == MAX_PAREJAS){                        //Si completamos todas las parejas, ganamos i guardamos puntuación
                guardarPuntuacion();
                win();
                
            }

        }else{                                                          //sino son pareja, deshabilitamos botones y restamos puntos
            deshabilitarLletra(secondbutton);
            console.log('No son pareja');
            restarPunts();
            
            setTimeout(() => {                                          //para que se deshabilite, y luego se vuelva a habilitar
                habilitarLletra(firstbutton);                           //de forma que se vea la letra en ése tiempo de retraso
                habilitarLletra(secondbutton);
            }, 400);
        }
        
        setTimeout(() => {                                               //reset de las variables con retraso 
            firstbutton = null;                                          // de forma que se tienen que volver a assignar qué botón presionamos primero y segundo
            secondbutton = null;
        }, 400);
    }   
}



//PUNTUACIÓN 
function sumarPunts(){
    punts +=10;
    puntos.textContent = punts;
    enviarDatos();                                                      //Actualizamos los puntos en tiempo real
}


function restarPunts(){
    punts -=3;

    //Evitar la puntuación negativa
    if (punts <= 0){                                                    //en caso de ser negativa, actualizamos punts = 0
        punts = 0; 
        puntos.textContent = 0;
    }else{
        puntos.textContent = punts;
    }

    enviarDatos();                                                      //Actualizamos los puntos en tiempo real
}


//Cuando ganas
function win(){
    estadoGame ='Partida Finalitzada';
    enviarDatos();
    location.assign('partidaFinalitzada.html');
}



//Habilitación y deshabilitación de los botones según vas jugando

function deshabilitarLletra(lletra){
    lletra.disabled = true;
}


function habilitarLletra(lletra){
    lletra.disabled = false;
}



/******************************** LocalStorage para guardar los datos (nombre y puntos) de la partida con mayor puntuación ******************************/

function guardarPuntuacion(){
    maxPunts = Number(localStorage.getItem("localpunts"));
    if(punts > maxPunts){                                           //Actualizamos los datos del localStorage
        localStorage.setItem("localpunts", punts);
        localStorage.setItem("localjugador", cookies);
        mostrarMaxEstadistiques();
    }
}

function mostrarMaxEstadistiques(){
    //Cogemos los datos de localStorage para mostrarlos
    maxPunts = Number(localStorage.getItem("localpunts"));
    maxJugador = localStorage.getItem("localjugador");

    millorJugador.textContent = maxJugador;
    millorPunts.textContent = maxPunts;
}



/********************************************************* Envió de las estadísitcas, datos actuales por el canal  ******************************************/

function enviarDatos(){
    bcc.postMessage({
        jugador: cookies,
        puntos: punts,
        estado: estadoGame
    });
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

mostrarMaxEstadistiques();
mostrarNombre();
crearButtons();
habilitarButtons();
colorNavegador();
enviarDatos();