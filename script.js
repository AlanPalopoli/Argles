/*----------------------OBJETOS------------------*/
class Juego {
    constructor(palabras, vidas, frase, inicio, victoria, palabraRandom, palabraEnProgre, tamañoPalabraEnProgre) {
        this.palabras = palabras
        this.vidas = vidas
        this.frase = frase
        this.inicio = inicio
        this.victoria = victoria
        this.palabraRandom = palabraRandom
        this.palabraEnProgre = palabraEnProgre
        this.tamañoPalabraEnProgre = tamañoPalabraEnProgre
    }
}

class Letras {
    constructor(id, letra){
        this.id = id
        this.letra = letra
    }
}

/*--------------------FUNCIONES---------------------*/
function aleatorio(min,max)
{
    return Math.random()*(max-min)+min;
}    

function chequearPalabra(palabraCheck){
    for(i=0; i < palabraCheck.length; i++){
        if((juego.palabraRandom.toUpperCase()).includes(palabraCheck[i])){
                if((juego.palabraRandom[i].toUpperCase()) == palabraCheck[i]){ //ES IGUAL SE PONE VERDE LA CASILLA
                    let filLetra = document.getElementById(`rowBox ${fila}`)
                    filLetra.children[i].className = "card text-white bg-success";
                    if(palabraCheck == juego.palabraRandom.toUpperCase()){
                        juego.victoria = 1
                    }
                }
                else //NO ES IGUAL PERO ESTÁ, SE PONE AMARILLA
                {
                    let filLetra = document.getElementById(`rowBox ${fila}`)
                    filLetra.children[i].className = "card text-white bg-warning";
                }
        }
        else //NO ESTÁ, SE PONE GRIS
        {
            let filLetra = document.getElementById(`rowBox ${fila}`)
            filLetra.children[i].className = "card text-white bg-secondary";
        }
    }
    fila ++
    col = 0
    juego.vidas --
    palabraFinal = ""
}

function rellenarBox(letra){
    if(juego.victoria == 0 && juego.vidas > 0){
        if(ArrayletrasAbecedario.includes(letra) && (letra != "BORRAR") && (letra != "ENTER"))
        {
            if(palabraFinal.length < 5){
                let filLetra = document.getElementById(`rowBox ${fila}`)
                palabraFinal = palabraFinal.concat(letra)
                filLetra.children[col].innerHTML += 
                `
                <font size="+3"><b>${letra}</b></font>
                `
                col++
            }  
        }
        else if (letra == 'ENTER')
        {
            if(palabraFinal.length == 5){
                if(localStorage.getItem('Palabras')){
                    let storage = localStorage.getItem('Palabras')
                    palabraStorage = storage
                }
                palabraStorage.length == 0 ? palabraStorage = palabraFinal : palabraStorage = palabraStorage + ',' + palabraFinal
                localStorage.setItem('Palabras', palabraStorage)
                chequearPalabra(palabraFinal)
            }
            else
            {
                Toastify({
                    text: "Debes ingresar 5 letras para enviar la palabra",
                    duration: 3000,
                    gravity: 'top',
                    position: 'right',
                }).showToast();
            }
        }
        else if (letra == 'BACKSPACE' || letra == 'BORRAR')
        {
            if (col > 0 )
            {    
                col--
                console.log(col)
                let filLetra = document.getElementById(`rowBox ${fila}`)
                palabraFinal = palabraFinal.slice(0, -1);
                filLetra.children[col].innerHTML = ""
            }
        }
    }
    else if (juego.victoria == 1){
        swal({
            title: '¡Felicitaciones!',
            text: 'Has ganado el juego.',
            icon: 'success'
          })
    }
    else if (juego.vidas <= 0)
    {
        swal({
            title: '¡Lo lamento!',
            text: 'Has perdido el juego.',
            icon: 'error'
            })
    }
}
/*-----------------------JUEGO-----------------------*/

let ArrayletrasAbecedario = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z","BORRAR","ENTER"]
let arrayLetras = []
let divLetras = document.getElementById("letras1")
let divLetras2 = document.getElementById("letras2")
let divLetras3 = document.getElementById("letras3")
let buttonLetras = []
let divBox = document.getElementById("main")
let divBoxCol
let palabraFinal = ""
let fila = 0
let col = 0
let palabraStorage = []
const juego = new Juego (["palas", "comer","pared","mirar","mujer"], 6, "", 0, 0, "", [], [])

ArrayletrasAbecedario.forEach((letraEnArray, indice)=>{
    const letra = new Letras(indice,letraEnArray)
    arrayLetras.push(letra) 
})

for(i=0;i<=5;i++){
    divBox.innerHTML += `
    <div class="row justify-content-center gap-1 pb-1" id="rowBox ${i}">
    `
    for(j=0;j<=4;j++){
        divBoxCol = document.getElementById(`rowBox ${i}`)
        divBoxCol.innerHTML += `
        <div class="card" style="height: 50px; width: 50px;" id="colBox ${j}"></div>
        `
    }
}

document.body.appendChild(divBox)
if (!localStorage.getItem('PalabraAdivinar'))
{
    juego.palabraRandom = juego.palabras[Math.floor(aleatorio(0,5))];
    localStorage.setItem('PalabraAdivinar', juego.palabraRandom)
}
else
{
    let storage = localStorage.getItem('PalabraAdivinar')
    juego.palabraRandom = storage
}


arrayLetras.forEach((letra, indice) => {
    if(indice <= 8) {
        divLetras.innerHTML += `
        <button class="btn btn-secondary" id="Letra ${letra.id}"> ${letra.letra} </button>
        `
    }
    else if (indice > 8 && indice <= 18)
    {
        divLetras2.innerHTML += `
        <button class="btn btn-secondary" id="Letra ${letra.id}"> ${letra.letra} </button>
        `
    }
    else if (indice > 18)
    {
        divLetras3.innerHTML += `
        <button class="btn btn-secondary" id="Letra ${letra.id}"> ${letra.letra} </button>
        `
    }
    document.body.appendChild(divLetras)
    document.body.appendChild(divLetras2)
    document.body.appendChild(divLetras3)
})

/*--------------------------------TECLADO PANTALLA Y MANUAL---------------------------------------- */
for (let i=0;i<arrayLetras.length; i++){
    buttonLetras[i] = document.getElementById(`Letra ${i}`)
    buttonLetras[i].addEventListener('click', () => {
        rellenarBox((arrayLetras[i].letra))
    })
} 

window.addEventListener("keydown", function (event) {
    rellenarBox(event.key.toUpperCase())
},false);

/*------------------------------------------------------------------------------------------------ */

if(localStorage.getItem('Palabras')){
    let storage = localStorage.getItem('Palabras')
    let arrayPalabra = storage.split(",", storage.length);
    for(let i=0;i<storage.length;i++){
        if(storage[i] == ','){
            i++
            fila++
            palabraFinal = ""
            col = 0
        }
        rellenarBox(storage[i])
    }
    fila = 0
    for(j=0;j<arrayPalabra.length;j++){
        chequearPalabra(arrayPalabra[j])
    }
}
//console.log(juego.palabraRandom) //Habilitar para saber cual es la palabra
