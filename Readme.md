# Dragon Ball: explorador de personajes

Aplicación web sencilla que consulta personajes de Dragon Ball y permite buscarlos por nombre o raza. El radar muestra las señales disponibles; al seleccionar una aparece una tarjeta individual. Haz clic en la tarjeta para girarla y consultar la descripción, el ki, el ki máximo y la raza.

## Tecnologías

- HTML y CSS
- JavaScript con módulos ES
- [Dragon Ball API](https://web.dragonball-api.com/documentation)

## Cómo ejecutarlo

Como el proyecto usa módulos de JavaScript, ábrelo desde un servidor local y no directamente como archivo. Por ejemplo, puedes usar la extensión **Live Server** de Visual Studio Code y abrir `Index.html`.

Se necesita conexión a internet para consultar la API y cargar la fuente externa.

## Estructura

- `Index.html`: estructura de la página.
- `Estilos.css`: estilos y diseño adaptable a móviles.
- `main.js`: inicio de la aplicación y búsqueda.
- `js/personajes.js`: consulta de datos a la API.
- `js/vista.js`: dibujo del radar y creación de la tarjeta giratoria.

Usa las flechas del teclado o los botones laterales para recorrer los personajes.

## Autor

Jose Luis Tot Herrera
