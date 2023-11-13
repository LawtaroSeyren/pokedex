# Proyecto PokéDex

**Enlace al sitio:** [https://pokedex-nssa.netlify.app/
](https://pokedex-nssa.netlify.app/) 

![poke2](https://github.com/LawtaroSeyren/pokedex/assets/119436282/3c270b74-9d6b-47e8-8df5-efcb21a36a97)

## Consignas

- Desarrollar una aplicación web front-end usando React JS que será un listado de Pokémon.
- Obtener la información de los Pokémon usando la API abierta de https://pokeapi.co/. 
- En la página principal mostrar un listado de todos los Pokémon
- De cada Pokémon mostrar al menos esta información: **Número, Nombre, Tipo (puede ser múltiple) e Imagen**
- En la parte superior del listado tendremos un campo de búsqueda para filtrar los Pokémon por su tipo, utilizando un dropdown. 
- Al clickear un Pokémon, mostrar una imagen grande además de información básica del mismo (stats y types).
- El diseño de la web es libre, pero se puede tomar referencia de https://pokedex.org/. 
- La web debe poder visualizarse desde cualquier dispositivo

### Opcional

![poke3](https://github.com/LawtaroSeyren/pokedex/assets/119436282/392f5905-f9c1-476a-94e7-8a964688b352)

- Además de la información básica mostrar habilidades, debilidades, todas sus evoluciones (si las tiene) y una lista de los juegos en los que aparece.
- Implementar Infinite Scroll para mostrar la lista de Pokémon.
- Utilizar custom hooks
- Utilizar Redux
- Utilizar Material UI

## Estructura del proyecto

![poke1](https://github.com/LawtaroSeyren/pokedex/assets/119436282/396253c4-2011-4329-8f16-3a8b68e59fac)

```
/src/
```
El archivo **main.jsx** se encarga de la gestión de rutas, incluyendo una página de error 404, mientras que **app.jsx** actúa como la página principal.
Los estilos globales se centralizan en **app.css**

```
/src/hooks
```
Este directorio contiene todas las funciones esenciales, como las peticiones a la API, traducciones y correcciones de nombres en el archivo **functions.js**, así como también los custom hooks que son utilizados en la aplicación.

```
/src/components
```
El archivo **index.js** funciona como barrel file y se encarga de centralizar y exportar tanto los assets que serán llamados mediante variables, (como el logo de la app), como todos los componentes. 

**Principales componentes:**
- Header: Encabezado con logo y link al home.
- Loader: Bloque con un mensaje de carga que se muestra a lo largo de la app mientras se están haciendo solicitudes.
- Error: Página de error
- Pokedex: Componente más importante que encapsula la grilla de todos los Pokémon, así como su información más detallada. Dentro hay varios sub componentes, como el botón que muestra el type del Pokémon, la cadena evolutiva, detalles gráficos, etc.

```
/src/assets
```
Almacena todos los recursos visuales, logo, portadas de videojuegos, imágenes default de nullidad, favicon, etc.

## Ejecución

1. `git clone https://github.com/LawtaroSeyren/pokedex.git` 
2. `cd nombre-proyecto`
3. `npm install`
4. `npm start`

## Desarrollo

- `npm run dev` o `npx vite`: Inicia el servidor de desarrollo de Vite.
- `npm run build` o `npx vite build`: Compila la aplicación para producción.

### Dependencias

**Vite** v4.4.5

**React** v18.2

**node** v18.17.1

#### react-router-dom

Utilizada la v6.17.0 para gestionar las rutas del proyecto con createBrowserRouter y RouterProvider; manejar parámetros con useParams, y navegación con Navigation.
