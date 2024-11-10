//OBJECTES
const obj_instruccions= document.getElementById("instruccions");
const obj_nombre_jugador= document.getElementById("nomJugador");
const nomStorage = sessionStorage.getItem("nomJugador");
const puntos = document.getElementById("punts");

const millorJugador = document.getElementById("millorJugador");
const millorPunts = document.getElementById("millorPunts");

//EVENTS
obj_instruccions.addEventListener("click", abrirInstrucciones);


//VARIABLES I CONSTANTS
let pagina;

let cookies;

let lletraJugada;
let firstbutton;
let secondbutton;
let contadorParejas = 0;
const MAX_PAREJAS = 10;

let punts = 0;
let maxPunts = 0;
let maxJugador;

const userAgent = navigator.userAgent;

const lletres = ['A','B','C','D','E','F','G','H','I','J',]
const lletresContenidor = document.getElementById('joc');


const bcc = new BroadcastChannel('canal');
let estadoGame = 'En joc';

//FUNCTIONS

function colorNavegador(){

    if (userAgent.includes("Chrome")) {
        document.body.style.backgroundColor = 'rgb(164, 237, 165)';
    } else if (userAgent.includes("Mozilla")) {
        document.body.style.backgroundColor = "orange"; 
    }
}

colorNavegador();

function mostrarNombre(){
   // obj_nombre_jugador.textContent = nomStorage;

   //Usamos .split para dividir la cadena en username y el nombre, 
   //y usamos el [1] para acceder a la segunda parte que es el valor nombre
    cookies = document.cookie.split('=')[1];
   obj_nombre_jugador.textContent = cookies;
  
}

mostrarNombre();

function abrirInstrucciones(){
   // pagina = window.open('instruccions.html');
    pagina = window.open('instruccions.html','instruccions','width=400,height=400');
}


//CREACIÓ DELS BUTTONS DEL JOC

function habilitarButtons(){
    for(let i = 1; i<= lletres.length * 2; i++){
       let literal ="boto_" + i;
       const botoA = document.getElementById(literal);
       botoA.disabled = false;
    }
}



function crearButtons(){

    //Guardamos en una variable el array de letras 2 veces,
    //de forma que lo mezclamos para que sea de forma aleatoria
    const lletresDuplicades = [...lletres, ...lletres];
    lletresDuplicades.sort(() => Math.random() - 0.5);

    //Creamos los botones
    for(let i = 0; i < lletresDuplicades.length; i++){
        const letra = lletresDuplicades[i];
        const crearBoton = document.createElement("button");
        crearBoton.id="boto_" + (i + 1);
        crearBoton.textContent = letra;
        crearBoton.addEventListener("click",() => jugarLletra(crearBoton));
        lletresContenidor.appendChild(crearBoton);
    }
}


crearButtons();
habilitarButtons();

// LÓGICA DEL JOC 

function deshabilitarLletra(lletra){
    lletra.disabled = true;
}

function habilitarLletra(lletra){
    lletra.disabled = false;

}


function  jugarLletra(lletra) {

    if(!firstbutton){
        firstbutton = lletra;
        deshabilitarLletra(firstbutton);

    }else if (!secondbutton){
        secondbutton = lletra;
        deshabilitarLletra(secondbutton);


        if (firstbutton.textContent === secondbutton.textContent){
            console.log('Pareja encontrada');
            contadorParejas++;
            sumarPunts();
            deshabilitarLletra(firstbutton);
            deshabilitarLletra(secondbutton);
            console.log(contadorParejas);

            //Si completamos todas las parejas, ganamos
            if (contadorParejas == MAX_PAREJAS){
                guardarPuntuacion();
                win();
                
            }

        }else{
            deshabilitarLletra(secondbutton);
            console.log('No son pareja');
            restarPunts();
            //para que se deshabilite, y luego se vuelva a habilitar
            //de forma que se vea la letra en ése tiempo de retraso
             setTimeout(() => { 
                habilitarLletra(firstbutton);
                habilitarLletra(secondbutton);
            }, 500);
        }

        //reset de las variables con retraso
        setTimeout(() => {
            firstbutton = null;
            secondbutton = null;
        }, 500);
    }   
}

function win(){
    estadoGame ='Partida Finalitzada';
    enviarDatos();
    location.assign('partidaFinalitzada.html');
}


//PUNTUACIÓN 

function sumarPunts(){
    punts +=10;
    puntos.textContent = punts;
    enviarDatos(); //Actualizamos los puntos en tiempo real
}

function restarPunts(){
    punts -=3;

    //Evitar la puntuación negativa
    if (punts <= 0){ //en caso de ser negativa, actualizamos punts = 0
        punts = 0; 
        puntos.textContent = 0;
    }else{
        puntos.textContent = punts;
    }

    enviarDatos(); //Actualizamos los puntos en tiempo real
}

function guardarPuntuacion(){
    maxPunts = Number(localStorage.getItem("localpunts"));
    if(punts > maxPunts){//Actualizamos los datos del localStorage
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

mostrarMaxEstadistiques();


function enviarDatos(){
    bcc.postMessage({
        jugador: cookies,
        puntos: punts,
        estado: estadoGame
    });
}

enviarDatos();