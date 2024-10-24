const lletres = ['A','B','C','D','E','F','G','H','I','J']

function habilitarBoto(){
    for(let i = 1; i<lletres.length;i++){
        const buto = document.createElement("button");
       let literal ="boto_" + i;
       const botoA = document.getElementById(literal);
       botoA.disabled = false;
}


function crearButons(){

    for(let i = 1; i<lletres.length;i++){
    const buto = document.createElement("button");
    boto.id="boto_" + i;
    boto.textContent = lletres[i-1];
    boto.addEventListener("click",() => console.log(boto));
    lletresContenidor.appendChild(boto);
    }

    
}
crearButons();
habilitarBoto();