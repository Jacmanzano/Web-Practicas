// ==== PRÁCTICA JS - PLANTILLA DEL ALUMNO (LOL MANAGER CRUD) ====
// URL de nuestra API PHP
const API_URL = 'api/campeones.php';

// Variables globales para el estado de la UI
let editandoId = null;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar los campeones al iniciar la página
    cargarCampeones();

    // 2. Event Listener para el botón de refrescar
    document.getElementById('btnRefrescar').addEventListener('click', cargarCampeones);

    // 3. Event Listener para el formulario (Crear o Actualizar)
    document.getElementById('campeon-form').addEventListener('submit', guardarCampeon);

    // 4. Event Listener para cancelar edición
    document.getElementById('btnCancelar').addEventListener('click', cancelarEdicion);
});

// ============================================
// READ: OBTENER TODOS LOS CAMPEONES (GET)
// ============================================
async function cargarCampeones() {
    const contenedor = document.getElementById('campeones-grid');
    contenedor.innerHTML = '<p class="blink">Cargando campeones desde la API PHP...</p>';

    try {
        // TODO: 1. Realiza un fetch a API_URL
        // TODO: 2. Transforma la respuesta a JSON
        // TODO: 3. Llama a la función renderizarCampeones pasándole el JSON
        const response = await fetch(API_URL);
        const data = await response.json();
        renderizarCampeones(data);
        
    } catch (error) {
        console.error('Error:', error);
        contenedor.innerHTML = '<p class="error-text">ERROR: No se pudieron cargar los campeones. Asegúrate de que XAMPP está encendido.</p>';
    }
}

// Función auxiliar para pintar campeones en el DOM (YA IMPLEMENTADA)
function renderizarCampeones(campeones) {
    const contenedor = document.getElementById('campeones-grid');
    contenedor.innerHTML = ''; 

    if (campeones.length === 0) {
        contenedor.innerHTML = '<p class="system-msg">No hay campeones registrados en la base de datos.</p>';
        return;
    }

    campeones.forEach(camp => {
        const div = document.createElement('div');
        div.className = 'campeon-card';
        div.innerHTML = `
            <h3>${camp.nombre}</h3>
            <p>⚔️ <strong>Rol:</strong> ${camp.rol}</p>
            <p>💀 <strong>Dificultad:</strong> <span class="badge-${camp.dificultad.toLowerCase()}">${camp.dificultad}</span></p>
            <p>💰 <strong>Precio:</strong> ${camp.precio} EA</p>
            <div class="card-actions">
                <button class="btn-edit" onclick="prepararEdicion(${camp.id}, '${camp.nombre}', '${camp.rol}', '${camp.dificultad}', ${camp.precio})">EDITAR</button>
                <button class="btn-delete" onclick="eliminarCampeon(${camp.id})">ELIMINAR</button>
            </div>
        `;
        contenedor.appendChild(div);
    });
}

// ============================================
// CREATE / UPDATE: GUARDAR CAMPEÓN (POST / PUT)
// ============================================
async function guardarCampeon(event) {
    event.preventDefault(); // Evitar que el formulario recargue la página

    // Capturar datos del formulario
    const id = document.getElementById('campeon-id').value;
    const nombre = document.getElementById('nombre').value;
    const rol = document.getElementById('rol').value;
    const dificultad = document.getElementById('dificultad').value;
    const precio = document.getElementById('precio').value;

    // Crear objeto con los datos
    const campeonData = {
        nombre: nombre,
        rol: rol,
        dificultad: dificultad,
        precio: parseInt(precio)
    };

    // Determinar si es Crear (POST) o Actualizar (PUT)
    let method = 'POST';
    if (editandoId) {
        method = 'PUT';
        campeonData.id = editandoId; // Añadir ID si es actualización
    }

    try {
        // TODO: 1. Realiza el fetch a API_URL con el método correspondiente (POST o PUT)
        // TODO: Recuerda enviar en el body el 'campeonData' convertido a String JSON
        // TODO: Recuerda añadir los headers ('Content-Type': 'application/json')
        
        // TODO: 2. Transforma la respuesta a JSON
        // TODO: 3. Comprueba si response.ok es true. Si lo es: 
        //       - llama a mostrarMensajeFormulario(mensajeDeAPI, "success-text")
        //       - llama a cancelarEdicion()
        //       - llama a cargarCampeones()
        // TODO: 4. Si response.ok es false, llama a mostrarMensajeFormulario con el error y "error-text"
        const response = await fetch(API_URL, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campeonData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            mostrarMensajeFormulario(data.mensaje || "Operación realizada con éxito.", "success-text");
            cancelarEdicion();
            cargarCampeones();
        } else {
            mostrarMensajeFormulario(data.error || "Hubo un problema al guardar.", "error-text");
        }

    } catch (error) {
        console.error('Error:', error);
        mostrarMensajeFormulario("Error de red. ¿XAMPP está iniciado?", "error-text");
    }
}

// ============================================
// DELETE: ELIMINAR CAMPEÓN (DELETE)
// ============================================
async function eliminarCampeon(id) {
    if (!confirm("¿Seguro que deseas eliminar este campeón de la base de datos?")) {
        return;
    }

    try {
        // TODO: 1. Realiza el fetch a API_URL con el método DELETE
        // TODO: Recuerda enviar en el body el id que se recibe como parámetro: { id: id } (convertido a JSON string)
        
        // TODO: 2. Transforma la respuesta a JSON
        // TODO: 3. Comprueba si response.ok es true. Si lo es, haz un alert() con el mensaje y recarga la lista.
        // TODO: 4. Si response.ok es false, haz un alert informando del error.
        const response = await fetch(API_URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert(data.mensaje || "Campeón eliminado correctamente.");
            cargarCampeones();
        } else {
            alert(data.error || "No se pudo eliminar el campeón.");
        }

    } catch (error) {
        console.error('Error:', error);
        alert("Error de red al intentar eliminar el campeón.");
    }
}

// ============================================
// FUNCIONES AUXILIARES DE UI (YA IMPLEMENTADAS)
// ============================================
function prepararEdicion(id, nombre, rol, dificultad, precio) {
    editandoId = id;
    document.getElementById('campeon-id').value = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('rol').value = rol;
    document.getElementById('dificultad').value = dificultad;
    document.getElementById('precio').value = precio;

    document.getElementById('form-title').innerText = "✏️ Editar Campeón Reclutado";
    document.getElementById('btnGuardar').innerText = "ACTUALIZAR CAMPEÓN";
    document.getElementById('btnCancelar').classList.remove('hidden');

    // Hacer scroll arriba para ver el formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelarEdicion() {
    editandoId = null;
    document.getElementById('campeon-form').reset();
    document.getElementById('campeon-id').value = '';
    
    document.getElementById('form-title').innerText = "➕ Reclutar Nuevo Campeón";
    document.getElementById('btnGuardar').innerText = "GUARDAR CAMPEÓN";
    document.getElementById('btnCancelar').classList.add('hidden');
}

function mostrarMensajeFormulario(msg, className) {
    const p = document.getElementById('form-mensaje');
    p.innerText = msg;
    p.className = `system-msg ${className}`;
    
    // Borrar el mensaje después de 4 segundos
    setTimeout(() => {
        p.innerText = "";
        p.className = "system-msg";
    }, 4000);
}