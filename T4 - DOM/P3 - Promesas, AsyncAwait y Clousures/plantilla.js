/**
 * Práctica: Asincronía, Promesas y Closures
 * Archivo: plantilla.js
 */

const API_URL = "api/estudiantes.php";

// Referencias al DOM
const btnPromesa = document.getElementById("btn-cargar-promesa");
const btnAsync = document.getElementById("btn-cargar-async");
const btnInforme = document.getElementById("btn-generar-informe");
const divResultados = document.getElementById("resultados");
const loader = document.getElementById("loader");
const statusInfo = document.getElementById("status-info");


// ==========================================
// UTILS: Funciones de manipulación del DOM
// ==========================================
function setCargando(estaCargando) {
    if (estaCargando) {
        loader.style.display = "block";
        divResultados.innerHTML = "";
        btnPromesa.disabled = true;
        btnAsync.disabled = true;
    } else {
        loader.style.display = "none";
        btnPromesa.disabled = false;
        btnAsync.disabled = false;
    }
}

function renderizarEstudiantes(estudiantes) {
    if (!estudiantes || estudiantes.length === 0) {
        divResultados.innerHTML = "<p>No hay estudiantes para mostrar.</p>";
        return;
    }

    let html = "";
    estudiantes.forEach(est => {
        const claseProcesado = est.procesado == 1 ? "procesado" : "";
        const txtBtn = est.procesado == 1 ? "Completado" : "Procesar";
        const disBtn = est.procesado == 1 ? "disabled" : "";

        html += `
        <div class="estudiante ${claseProcesado}" id="est-${est.id}">
            <div>
                <strong>${est.nombre} ${est.apellidos}</strong><br>
                <span>Curso: ${est.curso} | Nota: ${est.nota}</span>
            </div>
            <div>
                <button onclick="procesarEstudiante(${est.id})" id="btn-proc-${est.id}" ${disBtn}>${txtBtn}</button>
            </div>
        </div>`;
    });

    divResultados.innerHTML = html;
}

// ==========================================
// EJERCICIO 1: Promesas Clásicas (.then / .catch)
// ==========================================
function cargarEstudiantesPromesa() {
    statusInfo.innerText = "Cargando (Promesa)...";
    setCargando(true);

    // TODO: Haz un fetch() a API_URL + "?action=obtener_todos"
    // Recuerda usar .then() para desencriptar el json y luego renderizar los datos
    // Usa .catch() para mostrar error si lo hay
    // Usa .finally() para ocultar el loader llamando a setCargando(false)

    fetch(API_URL + "?action=obtener_todos")
        .then(respuesta => respuesta.json())
        .then(datos => {
            if (datos.success) {
                renderizarEstudiantes(datos.data);
                statusInfo.innerText = "Estudiantes cargados (Promesa).";
            } else {
                statusInfo.innerText = "Error del servidor: " + datos.error;
            }
        })
        .catch(error => {
            console.error("Falló la petición fetch:", error);
            statusInfo.innerText = "Error de conexión.";
        })
        .finally(() => {
            setCargando(false);
        });
}

btnPromesa.addEventListener("click", cargarEstudiantesPromesa);


// ==========================================
// EJERCICIO 2: Async / Await
// ==========================================
async function cargarDawAsync() {
    statusInfo.innerText = "Cargando DAW (Async/Await)...";
    setCargando(true);

    // TODO: Implementa la llamada secuencial usando 'await fetch(...)'
    // TODO: Usa un bloque try...catch para el manejo de errores
    // TODO: Filtra el array devuelto en JavaScript para dejar solo los de curso == 'DAW'
    // TODO: Posteriormente llama a renderizarEstudiantes() con tu array filtrado
    // TODO: Finalmente, oculta el loader (setCargando(false)) fuera o dentro del finally
    
    try {
        const respuesta = await fetch(API_URL + "?action=obtener_todos");
        const datos = await respuesta.json();

        if (datos.success) {
            const estudiantesDaw = datos.data.filter(est => est.curso === 'DAW');
            renderizarEstudiantes(estudiantesDaw);
            statusInfo.innerText = "Estudiantes de DAW cargados con éxito.";
        } else {
            statusInfo.innerText = "Error del servidor: " + datos.error;
        }
    } catch (error) {
        console.error("Falló la petición async:", error);
        statusInfo.innerText = "Error de conexión.";
    } finally {
        setCargando(false);
    }
}

btnAsync.addEventListener("click", cargarDawAsync);


// ==========================================
// EJERCICIO 3: Operaciones individuales con Async/Await (PUT API)
// ==========================================
async function procesarEstudiante(id) {
    const btn = document.getElementById("btn-proc-" + id);
    // Cambiamos temporalmente el texto para dar fedback
    btn.innerText = "Espere...";
    btn.disabled = true;

    // TODO: Realiza un fetch a API_URL + "?id=" + id, usando method: 'PUT'.
    // Esta vez envuelve todo en un try/catch lógico.
    // Si la respuesta es exitosa (success === true) cambia la clase CSS local:
    // document.getElementById("est-"+id).classList.add("procesado");
    // y deja el botón como "Completado" y opcionalmente disabled=true
    // Si falla, devuelve el botón a su texto inicial y activa la alerta.
    
    try {
        const respuesta = await fetch(API_URL + "?id=" + id, { method: 'PUT' });
        const datos = await respuesta.json();

        if (datos.success) {
            document.getElementById("est-" + id).classList.add("procesado");
            btn.innerText = "Completado";
            btn.disabled = true;
            statusInfo.innerText = `Estudiante ${id} procesado correctamente.`;
        } else {
            btn.innerText = "Procesar";
            btn.disabled = false;
            alert("Error al procesar: " + datos.error);
        }
    } catch (error) {
        console.error("Error en la actualización:", error);
        btn.innerText = "Procesar";
        btn.disabled = false;
        alert("Error de conexión al procesar el estudiante.");
    }
}

// ==========================================
// EJERCICIO 4: Closures
// ==========================================
function crearNotificador() {
    // TODO: Declara aquí tu variable de estado interna (ej: contador = 0).
    let contador = 0;

    return function() {
        // TODO: Incrementa el estado.
        contador++;
        // TODO: Muestralo escribiendo en statusInfo.innerText = "Se ha llamado X veces..."
        statusInfo.innerText = `El usuario ha pulsado este botón ${contador} veces`;
    }
}

// TODO: Instancia el closure vinculando el retorno de crearNotificador a una variable o directamente al EventListener
// Ej: const miNotificador = crearNotificador();
// btnInforme.addEventListener('click', miNotificador);

const miNotificador = crearNotificador();
btnInforme.addEventListener('click', miNotificador);