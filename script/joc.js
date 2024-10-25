const lletres = ['A','B','C','D','E','F','G','H','I','J',]
const lletresContenidor = document.getElementById('joc');


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