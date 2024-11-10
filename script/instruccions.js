//OBJECTES
const obj_close= document.getElementById("close");



/************* Botó de tancar la propia finestra ***********/

obj_close.addEventListener("click", closeInstrucciones);
function closeInstrucciones(){
     pagina = window.close('instruccions.html','instruccions','width=400,height=400');
}
 