// Array para almacenar los nombres de los participantes
let amigos = [];


// Variable para almacenar los ingresos
let nombre = '';


// Vinculo a los elementos del index
const contenidoInput = document.getElementById("amigo");
const listaAmigos = document.getElementById("listaAmigos");
const textoAmigoSorteado = document.getElementById("textoAmigoSorteado");


// Funcion para verificar que haya ingresado un valor valido
function validarAmigo(nombre)
{
    if(nombre === '')
    {
        return false;
    }
    else
    {
        for(let i=0; i<amigos.length; i++)
        {
            if(nombre === amigos[i])
            {
                return false;
            }
        }
    }

    return true;
}

// Funciones  para limpiar los elementos
function limpiarInput()
{
    contenidoInput.value = '';
}
function limpiartResultado()
{
    textoAmigoSorteado.textContent = '';
}
function limpiarListado()
{
    listaAmigos.innerHTML = '';
}

// Funcion para actualizar la lista de amigos en pantalla
function actualizarListaEnPantalla()
{
    const largo = amigos.length;

    // Limpiamos la pantalla de la lista
    listaAmigos.innerHTML = '';


    // Mostramos la lista de amigos en pantalla
    for(let i=0; i<largo; i++)
    {
        const nuevoItem = document.createElement('li');

        nuevoItem.textContent = amigos[i];

        listaAmigos.appendChild(nuevoItem);
    }
}


// Funcion para agregar un amigo
function agregarAmigo()
{
    nombre = contenidoInput.value;

    if(!validarAmigo(nombre))
    {
        // Avisamos al usuario que ingrese un nombre válido
        alert("Por favor, inserte un nombre válido.");
    }
    else
    {
        // Ingresamos el amigo a la lista de amigos
        amigos.push(nombre);

        actualizarListaEnPantalla();
    }

    // Limpiamos el input
    limpiarInput();

    return;
}



// Funcion para validar que la lista de amigos no está vacía
function validarListaConElementos()
{
    return (amigos.length >0) ? true : false;
}


// Funcion para sortear amigo
function sortearAmigo()
{
    if(validarListaConElementos())
    {
        // Elegimos el indice aleatorio
        const numeroAleatorio = Math.floor(Math.random() * amigos.length);

        // Agregamos el amigo sorteado a la pantalla
        limpiartResultado();
        textoAmigoSorteado.textContent = amigos[numeroAleatorio];
    }
    else
    {
        alert("No ha ingresado amigos todavía");
    }
}




// Funcion para reiniciar el sorteo
function reiniciarSorteo()
{
    amigos = [];

    limpiarInput();
    limpiarListado();
    limpiartResultado();
}