const JUEGOS = [
    { id: 1, titulo: "The Legend of Zelda: Breath of the Wild", genero: "aventura", plataforma: "switch", puntuacion: 9.7, anyo: 2017, descripcion: "Explora Hyrule en este mundo abierto revolucionario.", emoji: "🗡️", favorito: false },
    { id: 2, titulo: "God of War", genero: "accion", plataforma: "ps5", puntuacion: 9.2, anyo: 2018, descripcion: "Kratos y Atreus en una epopeya nórdica llena de acción.", emoji: "⚔️", favorito: false },
    { id: 3, titulo: "Hades", genero: "accion", plataforma: "pc", puntuacion: 9.0, anyo: 2020, descripcion: "Roguelite con narrativa increíble ambientado en la mitología griega.", emoji: "🔥", favorito: false },
    { id: 4, titulo: "Elden Ring", genero: "rpg", plataforma: "pc", puntuacion: 9.5, anyo: 2022, descripcion: "Mundo abierto de fantasía oscura creado por FromSoftware.", emoji: "🪐", favorito: false },
    { id: 5, titulo: "FIFA 24", genero: "deportes", plataforma: "ps5", puntuacion: 7.2, anyo: 2023, descripcion: "El simulador de fútbol más popular del mundo.", emoji: "⚽", favorito: false },
    { id: 6, titulo: "Civilization VI", genero: "estrategia", plataforma: "pc", puntuacion: 8.8, anyo: 2016, descripcion: "Construye un imperio que resista el paso del tiempo.", emoji: "♟️", favorito: false },
    { id: 7, titulo: "Metroid Prime Remastered", genero: "aventura", plataforma: "switch", puntuacion: 9.2, anyo: 2023, descripcion: "La remasterización de uno de los mejores juegos de toda la historia.", emoji: "🌌", favorito: false },
    { id: 8, titulo: "Forza Horizon 5", genero: "deportes", plataforma: "xbox", puntuacion: 9.1, anyo: 2021, descripcion: "Carreras de mundo abierto en los paisajes de México.", emoji: "🚗", favorito: false },
    { id: 9, titulo: "Hollow Knight", genero: "aventura", plataforma: "switch", puntuacion: 9.0, anyo: 2017, descripcion: "Metroidvania de extrema dificultad ambientado en un reino insecto.", emoji: "🦋", favorito: false },
    { id: 10, titulo: "Starfield", genero: "rpg", plataforma: "xbox", puntuacion: 7.5, anyo: 2023, descripcion: "Explora cientos de planetas en el universo de Bethesda.", emoji: "🚀", favorito: false },
    { id: 11, titulo: "Street Fighter 6", genero: "accion", plataforma: "ps5", puntuacion: 9.2, anyo: 2023, descripcion: "El rey de la lucha en 2D regresa renovado y espectacular.", emoji: "🥊", favorito: false },
    { id: 12, titulo: "Age of Empires IV", genero: "estrategia", plataforma: "pc", puntuacion: 8.3, anyo: 2021, descripcion: "Estrategia en tiempo real que regresa a sus raíces históricas.", emoji: "🏰", favorito: false },
];

const estado = {
    busqueda: "",
    genero: "todos",
    plataforma: "todas",
    soloFavoritos: false,
};

function crearTarjetaJuego(juego) {
    const article = document.createElement("article");
    article.classList.add("juego-card");
    if (juego.favorito) article.classList.add("favorito");
    article.setAttribute("data-id", juego.id);

    const cardTop = document.createElement("div");
    cardTop.classList.add("card-top");

    const emojiSpan = document.createElement("span");
    emojiSpan.classList.add("card-emoji");
    emojiSpan.textContent = juego.emoji;

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card-info");

    const tituloDiv = document.createElement("div");
    tituloDiv.classList.add("card-titulo");
    tituloDiv.textContent = juego.titulo;

    const cardMeta = document.createElement("div");
    cardMeta.classList.add("card-meta");

    const tagGenero = document.createElement("span");
    tagGenero.classList.add("tag", "tag-genero");
    tagGenero.textContent = juego.genero;

    const tagPlat = document.createElement("span");
    tagPlat.classList.add("tag", `tag-${juego.plataforma}`);
    tagPlat.textContent = juego.plataforma;

    cardMeta.append(tagGenero, tagPlat);
    cardInfo.append(tituloDiv, cardMeta);
    cardTop.append(emojiSpan, cardInfo);

    const descP = document.createElement("p");
    descP.classList.add("card-desc");
    descP.textContent = juego.descripcion;

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");

    const scoreDiv = document.createElement("div");
    scoreDiv.classList.add("card-puntuacion");
    if (juego.puntuacion >= 9) scoreDiv.classList.add("alta");
    else if (juego.puntuacion >= 7) scoreDiv.classList.add("media");
    else scoreDiv.classList.add("baja");
    scoreDiv.textContent = `★ ${juego.puntuacion}`;

    const anyoSpan = document.createElement("span");
    anyoSpan.classList.add("card-anyo");
    anyoSpan.textContent = juego.anyo;

    const cardActions = document.createElement("div");
    cardActions.classList.add("card-actions");

    const btnFav = document.createElement("button");
    btnFav.classList.add("btn-fav");
    if (juego.favorito) btnFav.classList.add("marcado");
    btnFav.setAttribute("data-accion", "favorito");
    btnFav.setAttribute("data-id", juego.id);
    btnFav.textContent = juego.favorito ? "⭐" : "☆";

    const btnDel = document.createElement("button");
    btnDel.classList.add("btn-del");
    btnDel.setAttribute("data-accion", "eliminar");
    btnDel.setAttribute("data-id", juego.id);
    btnDel.textContent = "🗑️";

    cardActions.append(btnFav, btnDel);
    cardFooter.append(scoreDiv, anyoSpan, cardActions);

    article.append(cardTop, descP, cardFooter);
    return article;
}

function renderizarCatalogo(juegos) {
    const catalogo = document.getElementById("catalogo");
    const emptyState = document.getElementById("empty-state");
    const contador = document.getElementById("contador");

    const tarjetas = catalogo.querySelectorAll(".juego-card");
    tarjetas.forEach(t => t.remove());

    juegos.forEach(juego => {
        catalogo.appendChild(crearTarjetaJuego(juego));
    });

    contador.innerHTML = `<strong>${juegos.length}</strong> juegos encontrados`;
    emptyState.style.display = juegos.length === 0 ? "flex" : "none";
}

function obtenerJuegosFiltrados() {
    return JUEGOS.filter(juego => {
        const cumpleBusqueda = juego.titulo.toLowerCase().includes(estado.busqueda);
        const cumpleGenero = estado.genero === "todos" || juego.genero === estado.genero;
        const cumplePlat = estado.plataforma === "todas" || juego.plataforma === estado.plataforma;
        const cumpleFav = !estado.soloFavoritos || juego.favorito;
        return cumpleBusqueda && cumpleGenero && cumplePlat && cumpleFav;
    });
}

function inicializarFiltrosGenero() {
    document.querySelectorAll(".chip-genero").forEach(chip => {
        chip.addEventListener("click", () => {
            estado.genero = chip.dataset.genero;
            document.querySelectorAll(".chip-genero").forEach(c => c.classList.remove("chip--activo"));
            chip.classList.add("chip--activo");
            actualizarVista();
        });
    });
}

function inicializarFiltrosPlataforma() {
    document.querySelectorAll(".chip-plataforma").forEach(chip => {
        chip.addEventListener("click", () => {
            estado.plataforma = chip.dataset.plataforma;
            document.querySelectorAll(".chip-plataforma").forEach(c => c.classList.remove("chip--activo"));
            chip.classList.add("chip--activo");
            actualizarVista();
        });
    });
}

function inicializarBusqueda() {
    document.getElementById("inp-buscar").addEventListener("input", (e) => {
        estado.busqueda = e.target.value.toLowerCase();
        actualizarVista();
    });
}

function inicializarEventosCatalogo() {
    document.getElementById("catalogo").addEventListener("click", (e) => {
        const btnFav = e.target.closest('[data-accion="favorito"]');
        const btnDel = e.target.closest('[data-accion="eliminar"]');

        if (btnFav) toggleFavorito(Number(btnFav.dataset.id));
        if (btnDel) eliminarJuego(Number(btnDel.dataset.id));
    });
}

function toggleFavorito(id) {
    const juego = JUEGOS.find(j => j.id === id);
    if (juego) {
        juego.favorito = !juego.favorito;
        actualizarVista();
    }
}

function inicializarBotonFavoritos() {
    const btn = document.getElementById("btn-solo-favoritos");
    btn.addEventListener("click", () => {
        estado.soloFavoritos = !estado.soloFavoritos;
        btn.classList.toggle("activo");
        btn.textContent = estado.soloFavoritos ? "✕ Todos los juegos" : "⭐ Solo favoritos";
        actualizarVista();
    });
}

function inicializarBotonForm() {
    const btn = document.getElementById("btn-abrir-form");
    const panel = document.getElementById("form-panel");
    btn.addEventListener("click", () => {
        panel.classList.toggle("oculto");
        btn.textContent = panel.classList.contains("oculto") ? "＋ Añadir juego" : "✕ Cancelar";
    });
}

function inicializarFormulario() {
    const form = document.getElementById("form-nuevo-juego");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nuevoJuego = {
            id: Date.now(),
            titulo: document.getElementById("inp-titulo-nuevo").value,
            genero: document.getElementById("inp-genero-nuevo").value,
            plataforma: document.getElementById("inp-plataforma-nuevo").value,
            puntuacion: parseFloat(document.getElementById("inp-puntuacion-nuevo").value),
            anyo: parseInt(document.getElementById("inp-anyo-nuevo").value),
            descripcion: document.getElementById("inp-desc-nuevo").value,
            emoji: document.getElementById("inp-emoji-nuevo").value || "🎮",
            favorito: false
        };
        JUEGOS.push(nuevoJuego);
        form.reset();
        document.getElementById("form-panel").classList.add("oculto");
        document.getElementById("btn-abrir-form").textContent = "＋ Añadir juego";
        actualizarVista();
    });
}

function actualizarEstadisticas() {
    const total = JUEGOS.length;
    const favs = JUEGOS.filter(j => j.favorito).length;
    const media = total > 0 ? (JUEGOS.reduce((acc, j) => acc + j.puntuacion, 0) / total).toFixed(1) : "0.0";

    document.getElementById("stat-total").innerHTML = `🎮 Total: <strong>${total}</strong>`;
    document.getElementById("stat-favoritos").innerHTML = `⭐ Favoritos: <strong>${favs}</strong>`;
    document.getElementById("stat-media").innerHTML = `📊 Media: <strong>${media}</strong>`;
}

function eliminarJuego(id) {
    const index = JUEGOS.findIndex(j => j.id === id);
    if (index !== -1) {
        const tarjeta = document.querySelector(`.juego-card[data-id="${id}"]`);
        if (tarjeta) {
            tarjeta.classList.add("saliendo");
            setTimeout(() => {
                JUEGOS.splice(index, 1);
                actualizarVista();
            }, 300);
        }
    }
}

function actualizarVista() {
    const filtrados = obtenerJuegosFiltrados();
    renderizarCatalogo(filtrados);
    actualizarEstadisticas();
}

document.addEventListener("DOMContentLoaded", () => {
    inicializarFiltrosGenero();
    inicializarFiltrosPlataforma();
    inicializarBusqueda();
    inicializarEventosCatalogo();
    inicializarBotonFavoritos();
    inicializarBotonForm();
    inicializarFormulario();
    actualizarVista();
});