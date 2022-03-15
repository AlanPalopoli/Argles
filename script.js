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

function rellenoPalabra()
{
    let palabraOut = []
    let contador = 0
    let aux = 0
    let encontroLetra = 0
    let divPalabra = document.createElement('div')
    if (juego.inicio == 0)  //Si el juego recien arranca muestro X cantidad de guiones bajos segun el largo de la palabra
    {
        while (contador < juego.palabraRandom.length) 
        {
            if (divPalabra == undefined)
            {
                divPalabra.innerHTML = "_ "
            }
            else
            {
                divPalabra.innerHTML = divPalabra.innerHTML + "_ " 
            }
            contador ++
        }
        console.log(divPalabra)
        document.body.appendChild(divPalabra)
        juego.inicio = 1
    }
    else
    {
        for (contador = 0 ; contador < juego.palabraRandom.length ; contador++) //Doble for para recorrer la Palabra verdadera y el array que contiene las letras que fui acertando
        {
            for (aux = 0 ; aux < juego.palabraRandom.length ; aux++) 
            {
                    if(juego.palabraRandom[contador] == juego.palabraEnProgre[aux])  
                    {
                        palabraOut.push(juego.palabraEnProgre[aux])
                        encontroLetra = 1
                    }
            }
            if (encontroLetra == 0)
            {
                palabraOut.push("_ ") //PONERLE UN GUION BAJO
            }
            else
            {
                encontroLetra = 0
            }
        }
        console.log((palabraOut.toString()).replaceAll(',', '')) //Muestro por pantalla los resultados si acierto una letra
        divPalabra.innerHTML = `${(palabraOut.toString()).replaceAll(',', '')}`
    }
    document.body.appendChild(divPalabra)
}

function chequearPalabra(letraOpalabra)
{
    let PospalabraAux = []
    let contadorAux = 0
    if (juego.vidas > 1)
    {
    
        if (letraOpalabra.length == 0)
        {
            alert("Tenes que ingresar una letra o una palabra")
        }
        else if (letraOpalabra.length == 1)
        {   
            if((juego.palabraEnProgre.includes(letraOpalabra)) == false)  //Corroboro que la letra que estoy ingresando no sea una que ya ingresé antes.
            { 
                if(juego.palabraRandom.includes(letraOpalabra))
                {
                    while (contadorAux != juego.palabraRandom.length )          // Mientras que el contador no supere el largo de la palabra la recorro
                    {  
                        if (juego.palabraRandom[contadorAux] == letraOpalabra)  // Si la letra ingresada es igual que la letra en la posicion[contador]
                        {
                            PospalabraAux.push(juego.palabraRandom[contadorAux])
                            juego.tamañoPalabraEnProgre.unshift(1)  //Sumo valores a la variable para que cuando acierte la misma cantidad de letras que el largo de la Palabra real me lo de por ganado
                        }
                        contadorAux ++
                    }
                    if (juego.palabraEnProgre == undefined)
                    {
                        juego.palabraEnProgre.unshift(PospalabraAux[0])
                    }
                    else 
                    {
                        juego.palabraEnProgre.push(PospalabraAux[0])
                    }
                    console.log("Excelente, esa letra estaba en la palabra")
                    rellenoPalabra()
                }
                else
                {
                    juego.vidas --
                    console.log(`La letra no se encuentra en la palabra, pierdes una vida... te quedan "${juego.vidas}" vidas`)
                }
            }
            else 
            {
                console.log("Ya ingresaste esa letra, ingresá otra que no hayas usado.")
            }
        }
        else if (letraOpalabra.length > 1)
        {
            if(juego.palabraRandom == letraOpalabra)
            {
                juego.victoria = 1
                console.log("Felicitaciones, la palabra es correcta. Has ganado el juego")
            }
            else
            {
                juego.vidas --
                console.log(`La palabra es incorrecta, pierdes una vida... te quedan "${juego.vidas}" vidas`)
            }

        }
        if (juego.palabraRandom.length == juego.tamañoPalabraEnProgre.length)
            {
                console.log("Felicitaciones, adivinaste la palabra. Has ganado el juego")
                juego.victoria = 1
            }
        
    }
    else
    {
        console.log("Lo lamento, has perdido el juego. ¡Vuelve a intentarlo!")
    }
}*/

function chequearPalabra(){
    
}

/*-----------------------JUEGO-----------------------*/

let ArrayletrasAbecedario = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z"]
let arrayLetras = []
let divLetras = document.getElementById("letras1")
let divLetras2 = document.getElementById("letras2")
let divLetras3 = document.getElementById("letras3")
let buttonLetras = []
let divBox = document.getElementById("main")
let divBoxCol
const juego = new Juego (["palabra", "colegio","puerta","hombre","mujer"], 6, "", 0, 0, "", [], [])

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

juego.palabraRandom = juego.palabras[Math.floor(aleatorio(0,5))];
rellenoPalabra()

arrayLetras.forEach((letra, indice) => {
    if(indice <= 8) {
        divLetras.innerHTML += `
        <button class="btn btn-secondary" id="Letra ${letra.id}"> ${letra.letra} </button>
        `
    }
    else if (indice > 8 && indice <= 17)
    {
        divLetras2.innerHTML += `
        <button class="btn btn-secondary" id="Letra ${letra.id}"> ${letra.letra} </button>
        `
    }
    else if (indice > 17)
    {
        divLetras3.innerHTML += `
        <button class="btn btn-secondary" id="Letra ${letra.id}"> ${letra.letra} </button>
        `
    }
    document.body.appendChild(divLetras)
    document.body.appendChild(divLetras2)
    document.body.appendChild(divLetras3)
})

for (let i=0;i<arrayLetras.length; i++){
    buttonLetras[i] = document.getElementById(`Letra ${i}`)
    buttonLetras[i].addEventListener('click', () => {
        chequearPalabra((arrayLetras[i].letra))
    })
} 

window.addEventListener("keydown", function (event) {
    arrayLetras.forEach((letra) => {
        if(event.key == letra.letra)
        {
            chequearPalabra((letra.letra))
        }
    })
  },false);

console.log(juego.palabraRandom) //Habilitar para saber cual es la palabra



/* buttonLetra.addEventListener('click', () => {
    ArrayletrasAbecedario.forEach((letraEnArray, indice)=>{
        const letra = new Letras(indice,letraEnArray)
        arrayLetras.push(letra)
    })
}) */



/*
buttonLetras.addEventListener('click', () => { 
    console.log("Toco un botonazo!")
})
arrayLetras.forEach((letra)=> { 
    arrayLetras.addEventListener('click', () => {
        console.log("Toco un botonazo!")
    })   
})*/

/*arrayLetras.forEach(letra => {
    letra.addEventListener('click', () => {
        console.log("Toco un botonazo!")
    })   
})






/*while (juego.vidas > 0 && juego.victoria == 0 )
{
    juego.frase = prompt ("Ingrese una letra o palabra")
    chequearPalabra(juego.frase)
}
if (juego.vidas == 0)
{
    console.log("Lo lamento, has perdido el juego. ¡Vuelve a intentarlo!")
}*/
