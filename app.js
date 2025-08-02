// Variables
let amigos = [];
let amigo_ingresado = '';   // x input


// Vinculo a los elementos del index
const contenidoInput = document.getElementById("amigo");
const listaAmigos = document.getElementById("listaAmigos");


// Funciones para verificar que haya ingresado un valor valido
const noEstaVacio = (nombre) => !(nombre === '');
const noEstaRepetido = (nombre, lista) => !lista.includes(nombre);


// Funciones  para limpiar los elementos
const limpiarInput = () => {contenidoInput.value = ''; return;}


// Funcion para mostrar un mensaje vacio en el listado de amigos si no hay ninguno todavia
const mostrarMensajeVacio = () => {
    listaAmigos.innerHTML = '<li class="lista-vacia" id="mensajeVacio">Todavía no ha agregado a ningún amigo.</li>';
    return;
}


// Funcion para validar que la lista de amigos no está vacía
const noEstaVacia = (lista) => lista.length > 0;


// Plantilla para cada elemento de la lista amigos
const crearPlantillaAmigo = (nombre, index) => `
    <span class="amigo-nombre">${nombre}</span>
    <div class="amigo-acciones">
        <button class="btn-accion btn-editar" onclick="editarAmigo(${index})" title="Editar">
            <img class="icono-accion" src="https://img.icons8.com/material/50/666666/pencil--v1.png" alt="Editar">
        </button>
        <button class="btn-accion btn-eliminar" onclick="eliminarAmigo(${index})" title="Eliminar">
            <img class="icono-accion" src="https://img.icons8.com/material/50/666666/trash.png" alt="Eliminar">
        </button>
    </div>
`;



// Funcion para actualizar la lista de amigos en pantalla
function actualizarListaEnPantalla()
{
    if(!noEstaVacia(amigos))  // si está vacia
    {
        mostrarMensajeVacio();
    }
    else
    {
        // Limpiamos pantalla
        listaAmigos.innerHTML = '';

        amigos.forEach((nombre, index) => {
            const li = document.createElement('li');
            li.className = 'amigo-item';
            li.innerHTML = crearPlantillaAmigo(nombre, index);
            listaAmigos.appendChild(li);
        });
    }

    return;
}


// Funcion para agregar un amigo
function agregarAmigo()
{
    nombre = contenidoInput.value;

    if(!noEstaVacio(nombre))    // Está vacio
    {
        alert("Por favor ingresa un nombre.");
    }
    else
    {
        if(!noEstaRepetido(nombre, amigos)) // Está repetido
        {
            alert("¡Ese nombre está repetido!");
        }
        else
        {
            amigos.push(nombre);
            actualizarListaEnPantalla();
        }
    }

    limpiarInput();
    actualizarBotonAgregar();
    actualizarEstadoBotones();

    return;
}


// Funcion mostrar resultado del sorteo
function mostrarResultado(index)
{
    const textoResultado = document.getElementById('textoResultado');
    const textoAmigoSorteado = textoResultado.querySelector('.textoAmigoSorteado');
    
    // Actualizar el texto con el nombre del amigo
    textoAmigoSorteado.textContent = amigos[index];
    
    // Hacer visible el resultado
    textoResultado.style.visibility = 'visible';

    const div = document.querySelector(".resultado_sorteo");
    div.style.backgroundImage = "url('/challenge-amigo-secreto/assets/cartel.png')";
}


// Funcion para sortear amigo
function sortearAmigo()
{
    if(noEstaVacia(amigos))
    {
        const numeroAleatorio = Math.floor(Math.random() * amigos.length);

        mostrarResultado(numeroAleatorio);
    }
    else
    {
        alert("No ha ingresado amigos todavía.");
    }

    limpiarInput();
    actualizarBotonAgregar();
    actualizarEstadoBotones();

    return;
}

// Ocultar resultado
function ocultarResultado()
{
    const textoResultado = document.getElementById('textoResultado');
    
    textoResultado.style.visibility = 'hidden';
}


// Funcion para reiniciar el sorteo
function reiniciarSorteo()
{
    amigos = [];

    limpiarInput();
    actualizarListaEnPantalla();
 
    actualizarBotonAgregar();
    actualizarEstadoBotones();

    ocultarResultado();

    const div = document.querySelector(".resultado_sorteo");
    div.style.backgroundImage = "url('/challenge-amigo-secreto/assets/gatito.png')";

    return;
}

function eliminarAmigo(index) {
    // Confirmar antes de eliminar
    const amigo = amigos[index];
    if (confirm(`¿Estás seguro de que quieres eliminar a "${amigo}"?`)) {
        amigos.splice(index, 1);

        actualizarListaEnPantalla();
        actualizarEstadoBotones();
    }

    return;
}


function editarAmigo(index) {
    const amigo = amigos[index];
    
    // Colocar nombre en el input
    contenidoInput.value = amigo;
    
    // Eliminamos de la lista
    amigos.splice(index, 1);
    
    // Actualizar botones
    actualizarListaEnPantalla();
    actualizarBotonAgregar();
    actualizarEstadoBotones();
    
    // Enfocar y seleccionar
    contenidoInput.focus();
    contenidoInput.select();
}



// ========== ESTADO DE LOS BOTONES ==========
document.addEventListener('DOMContentLoaded', function() {
    // Event listeners
    contenidoInput.addEventListener('input', actualizarBotonAgregar);
    
    // Estados iniciales
    actualizarBotonAgregar();
    actualizarEstadoBotones();
});

// ========== FUNCIONES DE CONTROL ==========
function actualizarBotonAgregar() {
    const botonAgregar = document.querySelector('.button_add');
    
    // Activar apenas hay texto
    botonAgregar.disabled = contenidoInput.value.trim() === '';
}

function actualizarEstadoBotones() {
    const botones = document.querySelectorAll('.button_icon');
    
    botones.forEach(boton => {
        boton.disabled = !noEstaVacia(amigos);
    });
}
