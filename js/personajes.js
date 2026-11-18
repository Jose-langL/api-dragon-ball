const URL_PERSONAJES = "https://dragonball-api.com/api/characters?limit=15";

export async function obtenerPersonajes() {
    const respuesta = await fetch(URL_PERSONAJES);

    if (!respuesta.ok) {
        throw new Error(`La API respondió con el estado ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    return Array.isArray(datos.items) ? datos.items : [];
}
