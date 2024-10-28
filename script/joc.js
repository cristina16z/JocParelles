//OBJECTES
const obj_instruccions= document.getElementById("instruccions");

const obj_nombre_jugador= document.getElementById("nomJugador");
const nomStorage = sessionStorage.getItem('nomJugador');

//EVENTS
obj_instruccions.addEventListener("click", abrirInstrucciones);


//VARIABLES I CONSTANTS
let pagina;



const lletres = ['A','B','C','D','E','F','G','H','I','J',]
const lletresContenidor = document.getElementById('joc');



//FUNCTIONS


function mostrarNombre(){
    obj_nombre_jugador.textContent = nomStorage;
}

mostrarNombre();

function abrirInstrucciones(){
   // pagina = window.open('instruccions.html');
    pagina = window.open('instruccions.html','instruccions','width=400,height=400');
}



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
        crearBoton.addEventListener("click",() => console.log(crearBoton.textContent));
        lletresContenidor.appendChild(crearBoton);
    }
}



crearButtons();
habilitarButtons();



