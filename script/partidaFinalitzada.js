//CONSTANTS
const userAgent = navigator.userAgent;



//FUNCIONS

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