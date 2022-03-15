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

/*function rellenoPalabra()
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
}*/

/*function chequearPalabra(letraOpalabra)
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

function chequearPalabra(palabraCheck){
    if(palabraCheck == juego.palabraRandom.toUpperCase()){
        console.log("Felicitaciones, advinaste la palabra. Has ganado el juego")
        juego.victoria = 1
    }
    else
    {
        for(i=0; i <= palabraCheck.length; i++){
            if((juego.palabraRandom.toUpperCase()).includes(palabraCheck[i])){
                 if((juego.palabraRandom[i].toUpperCase()) == palabraCheck[i]){
                     console.log("ES IGUAL LA LETRA")//ES IGUAL SE PONE VERDE LA CASILLA
                 }
                 else
                 {
                    console.log("NO ES IGUAL PERO EXISTE") //NO ES IGUAL PERO ESTÁ, SE PONE AMARILLA
                 }
            }
            else {
                console.log("NO EXISTE")//NO ESTÁ, SE PONE GRIS
            }
        }
        
        console.log("La palabra es incorrecta, sigue intentando")
        fila ++
        col = 0
        juego.vidas --
    }
    palabraFinal = ""
}

function rellenarBox(letra){
    if(juego.victoria == 0 && juego.vidas > 0){
        if(ArrayletrasAbecedario.includes(letra) && (letra != "BORRAR") && (letra != "ENTER"))
        {
            if(palabraFinal.length < 5){
                let filLetra = document.getElementById(`rowBox ${fila}`)
                palabraFinal = palabraFinal.concat(letra)
                //console.log(palabraFinal) 
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
                chequearPalabra(palabraFinal)
            }
            else
            {
                alert("Debes ingresar 5 letras para enviar la palabra")
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
        alert("Ya has ganado el juego.")
    }
    else if (juego.vidas <= 0)
    {
        alert("Lo lamento, has perdido el juego") 
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
const juego = new Juego (["palab", "coleg","puert","hombr","mujer"], 6, "", 0, 0, "", [], [])

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
//rellenoPalabra()

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

console.log(juego.palabraRandom) //Habilitar para saber cual es la palabra

/*
window.addEventListener("keydown", function (event) {
    if(juego.victoria == 0 && juego.vidas > 0){
        if(ArrayletrasAbecedario.includes(event.key.toUpperCase()))
        {
            if(palabraFinal.length < 5){
                let filLetra = document.getElementById(`rowBox ${fila}`)
                palabraFinal = palabraFinal.concat(event.key.toUpperCase())
                //console.log(palabraFinal) 
                filLetra.children[col].innerHTML += 
                `
                <font size="+3"><b>${event.key.toUpperCase()}</b></font>
                `
                col++
            }  
        }
        else if (event.key == 'Enter')
        {
            if(palabraFinal.length == 5){
                chequearPalabra(palabraFinal)
            }
            else
            {
                alert("Debes ingresar 5 letras para enviar la palabra")
            }
        }
        else if (event.key == 'Backspace')
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
        alert("Ya has ganado el juego.")
    }
    else if (juego.vidas <= 0)
    {
        alert("Lo lamento, has perdido el juego") 
    }
},false);
*/

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
