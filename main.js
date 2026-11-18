import { obtenerPersonajes } from "./js/personajes.js";
import { mostrarPersonaje, mostrarRadar } from "./js/vista.js";

const tarjeta = document.querySelector("#TarjetaPersonaje");
const formularioBusqueda = document.querySelector("#FormularioBusqueda");
const campoBusqueda = document.querySelector("#Buscar");
const estado = document.querySelector("#Estado");
const radar = document.querySelector("#Radar");
const ayudaRadar = document.querySelector("#AyudaRadar");
const botonAnterior = document.querySelector("#Anterior");
const botonSiguiente = document.querySelector("#Siguiente");

let personajes = [];
let personajesVisibles = [];
let indiceSeleccionado = 0;

function seleccionarPersonaje(indice) {
    if (personajesVisibles.length === 0) return;

    indiceSeleccionado = (indice + personajesVisibles.length) % personajesVisibles.length;
    const personaje = personajesVisibles[indiceSeleccionado];
    mostrarPersonaje(tarjeta, personaje);
    mostrarRadar(radar, personajesVisibles, indiceSeleccionado, seleccionarPersonaje);
    ayudaRadar.textContent = `Señal ${indiceSeleccionado + 1} de ${personajesVisibles.length}: ${personaje.name || "Personaje"}`;
}

function actualizarResultados() {
    const busqueda = campoBusqueda.value.trim().toLocaleLowerCase();
    const idSeleccionado = personajesVisibles[indiceSeleccionado]?.id;

    personajesVisibles = personajes.filter((personaje) => {
        const nombre = (personaje.name || "").toLocaleLowerCase();
        const raza = (personaje.race || "").toLocaleLowerCase();
        return nombre.includes(busqueda) || raza.includes(busqueda);
    });

    const nuevoIndice = personajesVisibles.findIndex((personaje) => personaje.id === idSeleccionado);
    indiceSeleccionado = nuevoIndice >= 0 ? nuevoIndice : 0;
    estado.textContent = `${personajesVisibles.length} señal${personajesVisibles.length === 1 ? "" : "es"} en el radar`;
    seleccionarPersonaje(indiceSeleccionado);

    if (personajesVisibles.length === 0) {
        mostrarPersonaje(tarjeta, null);
        mostrarRadar(radar, [], 0, seleccionarPersonaje);
        ayudaRadar.textContent = "No hay señales con esa búsqueda";
    }
}

formularioBusqueda.addEventListener("submit", (evento) => {
    evento.preventDefault();
    actualizarResultados();
});

campoBusqueda.addEventListener("input", actualizarResultados);
botonAnterior.addEventListener("click", () => seleccionarPersonaje(indiceSeleccionado - 1));
botonSiguiente.addEventListener("click", () => seleccionarPersonaje(indiceSeleccionado + 1));

document.addEventListener("keydown", (evento) => {
    if (["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].includes(evento.key)) {
        const elementoActivo = document.activeElement;
        if (elementoActivo === campoBusqueda || elementoActivo.isContentEditable) return;
        evento.preventDefault();
        const avanzar = evento.key === "ArrowRight" || evento.key === "ArrowDown";
        seleccionarPersonaje(indiceSeleccionado + (avanzar ? 1 : -1));
    }
});

async function iniciar() {
    estado.textContent = "Cargando personajes…";

    try {
        personajes = await obtenerPersonajes();
        actualizarResultados();
    } catch (error) {
        console.error("No se pudieron cargar los personajes:", error);
        estado.textContent = "No fue posible cargar los personajes. Revisa tu conexión e inténtalo de nuevo.";
        tarjeta.innerHTML = "";
        ayudaRadar.textContent = "No se pudieron encontrar señales";
    }
}

iniciar();
