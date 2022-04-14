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

function cuantasVecesAparece(cadena, caracter){
    var indices = [];
    for(var h = 0; h < cadena.length; h++) {
      if (cadena[h] === caracter) indices.push(h);
    }
      return indices.length;
  }

function posicionLetraCorrecta(cadena , posCaracter){
    if(cadena.includes(posCaracter)) return true
    else return false
}

function chequearPalabra(palabraCheck){
    let letraAcertada = []
    let letraAcertadaPos = []
    let j = 0
    for(i=0; i < palabraCheck.length; i++){
        if((juego.palabraRandom.toUpperCase()).includes(palabraCheck[i]))
        {       
            while (j < palabraCheck.length)
            {
                if((juego.palabraRandom[j].toUpperCase()) == palabraCheck[j])
                { //ES IGUAL SE PONE VERDE LA CASILLA
                    let filLetra = document.getElementById(`rowBox ${fila}`)
                    filLetra.children[j].className = "card text-white bg-success";
                    letraAcertadaPos.push(j)
                    letraAcertada.push(palabraCheck[j])
                    if(palabraCheck == juego.palabraRandom.toUpperCase())
                    {
                        juego.victoria = 1
                    }
                }
                else //NO ESTÁ, SE PONE GRIS
                {
                    let filLetra = document.getElementById(`rowBox ${fila}`)
                    filLetra.children[j].className = "card text-white bg-secondary";
                }
                j++
            }
            if (!posicionLetraCorrecta(letraAcertadaPos,i) )//NO ES IGUAL PERO ESTÁ, SE PONE AMARILLA
            {
                if((cuantasVecesAparece(juego.palabraRandom.toUpperCase(), palabraCheck[i])) > (cuantasVecesAparece(letraAcertada.toString(), palabraCheck[i])))
                {
                    let filLetra = document.getElementById(`rowBox ${fila}`)
                    filLetra.children[i].className = "card text-white bg-warning";
                }
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
                <font size="+4"><b>${letra}</b></font>
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
let palabraArchivo = []

fetch('/palabras.json')
    .then( (res) => res.json())
    .then( (data) => {
        data.forEach((palabraArch) =>{
            palabraArchivo.push(palabraArch)
        })
    })
    
setTimeout(() => {
    juego.palabras = palabraArchivo
}, 200);

const juego = new Juego ([], 6, "", 0, 0, "", [], [])


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
        <div class="card" style="height: 62px; width: 62px;" id="colBox ${j}"></div>
        `
    }
}

document.body.appendChild(divBox)
setTimeout(() => {
    if (!localStorage.getItem('PalabraAdivinar'))
    {
        juego.palabraRandom = juego.palabras[Math.floor(aleatorio(0,1668))];
        localStorage.setItem('PalabraAdivinar', juego.palabraRandom)
    }
    else
    {
        let storage = localStorage.getItem('PalabraAdivinar')
        juego.palabraRandom = storage
    }
}, 300);

arrayLetras.forEach((letra, indice) => {
    if(indice <= 8) {
        divLetras.innerHTML += `
        <button class="btn btn-secondary letras1" id="Letra ${letra.id}"> ${letra.letra} </button>
        `
    }
    else if (indice > 8 && indice <= 18)
    {
        divLetras2.innerHTML += `
        <button class="btn btn-secondary letras2" id="Letra ${letra.id}"> ${letra.letra} </button>
        `
    }
    else if (indice > 18)
    {
        divLetras3.innerHTML += `
        <button class="btn btn-secondary letras3" id="Letra ${letra.id}"> ${letra.letra} </button>
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

let modalButton = document.getElementById("como_jugar")
let modalEstadisticas = document.getElementById("estadisticas")

modalButton.addEventListener('click', () => {
    swal({
        title: 'CÓMO JUGAR',
        text: `Adivina la palabra oculta en seis intentos.

        Cada intento debe ser una palabra válida de 5 letras.
        
        Después de cada intento el color de las letras cambia para mostrar qué tan cerca estás de acertar la palabra.
        
        Puede haber letras repetidas. Las pistas son independientes para cada letra y tienen prioridad.
        `,
        icon: 'info'
        })
})

modalEstadisticas.addEventListener('click', () => {
    swal({
        title: 'ESTADISTICAS',
        text: `
        `,
        icon: 'info'
        })
})


/*------------------------------------------------------------------------------------------------ */
setTimeout(() => {
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
}, 400);
//console.log(juego.palabraRandom) //Habilitar para saber cual es la palabra
