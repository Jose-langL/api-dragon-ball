function crearDato(etiqueta, valor) {
    const grupo = document.createElement("div");
    grupo.className = "dato-personaje";
    const titulo = document.createElement("h3");
    titulo.textContent = etiqueta;
    const texto = document.createElement("p");
    texto.textContent = valor || "Sin información";
    grupo.append(titulo, texto);
    return grupo;
}

function crearTarjeta(personaje) {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "tarjeta-giratoria";
    boton.setAttribute("aria-label", `Ver información de ${personaje.name || "este personaje"}`);

    const giro = document.createElement("span");
    giro.className = "giro-tarjeta";
    const frente = document.createElement("span");
    frente.className = "cara-tarjeta frente-tarjeta";

    const etiqueta = document.createElement("span");
    etiqueta.className = "etiqueta-tarjeta";
    etiqueta.textContent = "SEÑAL DETECTADA";
    const nombre = document.createElement("span");
    nombre.className = "nombre-tarjeta";
    nombre.textContent = personaje.name || "Personaje desconocido";
    const imagen = document.createElement("img");
    imagen.className = "imagen-personaje";
    imagen.src = personaje.image || "./Multimedia/Titulo.png";
    imagen.alt = `Imagen de ${personaje.name || "personaje"}`;
    imagen.loading = "lazy";
    const raza = document.createElement("span");
    raza.className = "raza-tarjeta";
    raza.textContent = personaje.race || "Raza desconocida";
    frente.append(etiqueta, nombre, imagen, raza);

    const reverso = document.createElement("span");
    reverso.className = "cara-tarjeta reverso-tarjeta";
    const titulo = document.createElement("span");
    titulo.className = "titulo-reverso";
    titulo.textContent = personaje.name || "Información";
    reverso.append(
        titulo,
        crearDato("Descripción", personaje.description),
        crearDato("Ki", personaje.ki),
        crearDato("Ki máximo", personaje.maxKi),
        crearDato("Raza", personaje.race)
    );
    giro.append(frente, reverso);
    boton.append(giro);
    boton.addEventListener("click", () => {
        const girada = boton.classList.toggle("girada");
        boton.setAttribute("aria-pressed", String(girada));
    });
    return boton;
}

export function mostrarPersonaje(contenedor, personaje) {
    contenedor.replaceChildren();
    if (!personaje) {
        const mensaje = document.createElement("p");
        mensaje.className = "mensajeError";
        mensaje.textContent = "No se encontraron personajes. Prueba con otro nombre o raza.";
        contenedor.append(mensaje);
        return;
    }
    contenedor.append(crearTarjeta(personaje));
}

export function mostrarRadar(contenedor, personajes, seleccionado, alSeleccionar) {
    contenedor.querySelectorAll(".punto-radar").forEach((punto) => punto.remove());
    const total = personajes.length;

    personajes.forEach((personaje, indice) => {
        const angulo = (indice / Math.max(total, 1)) * Math.PI * 2 - Math.PI / 2;
        const radio = total > 8 && indice % 2 === 0 ? 37 : 43;
        const punto = document.createElement("button");
        punto.type = "button";
        punto.className = "punto-radar";
        punto.style.left = `${50 + Math.cos(angulo) * radio}%`;
        punto.style.top = `${50 + Math.sin(angulo) * radio}%`;
        punto.setAttribute("aria-label", `Seleccionar ${personaje.name || "personaje"}`);
        punto.title = personaje.name || "Personaje";

        const puntoLuz = document.createElement("span");
        puntoLuz.className = "luz-punto";
        punto.append(puntoLuz);
        if (indice === seleccionado) {
            punto.classList.add("seleccionado");
            punto.setAttribute("aria-current", "true");
        }
        punto.addEventListener("click", () => alSeleccionar(indice));
        contenedor.append(punto);
    });
}
