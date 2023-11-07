export const urlBase = "https://pokeapi.co/api/v2"

export { useTypes } from './useTypes'
export { usePokemonCard } from './usePokemonCard'
export { usePokemonDetail } from './usePokemonDetail'

import red from "../assets/red.jpg"
import blue from "../assets/blue.jpg"
import yellow from "../assets/yellow.jpg"
import gold from "../assets/gold.jpg"
import silver from "../assets/silver.jpg"
import crystal from "../assets/crystal.jpg"
import ruby from "../assets/ruby.jpg"
import sapphire from "../assets/sapphire.jpg"
import emerald from "../assets/emerald.jpg"
import firered from "../assets/firered.jpg"
import leafgreen from "../assets/leafgreen.jpg"
import diamond from "../assets/diamond.jpg"
import pearl from "../assets/pearl.jpg"
import platinum from "../assets/platinum.jpg"
import heartgold from "../assets/heartgold.jpg"
import soulsilver from "../assets/soulsilver.jpg"
import black from "../assets/black.jpg"
import white from "../assets/white.jpg"
import black2 from "../assets/black-2.jpg"
import white2 from "../assets/white-2.jpg"


// Imágenes en caso de nullidad

import missingno  from "../assets/missingno.png"
import missingbig  from "../assets/missingbig.png"

// Traducción de los types

export const typeNames = {
    bug: 'BICHO',
    dark: 'SINIESTRO',
    dragon: 'DRAGON',
    electric: 'ELECTRICO',
    fairy: 'HADA',
    fighting: 'LUCHA',
    fire: 'FUEGO',
    flying: 'VOLADOR',
    grass: 'PLANTA',
    ground: 'TIERRA',
    ghost: 'FANTASMA',
    ice: 'HIELO',
    normal: 'NORMAL',
    poison: 'VENENO',
    psychic: 'PSIQUICO',
    rock: 'ROCA',
    water: 'AGUA',
    steel: 'ACERO',
};

export const gameCovers = {
    red,
    blue,
yellow,
gold ,
silver ,
crystal ,
ruby ,
sapphire ,
emerald ,
firered ,
leafgreen ,
diamond ,
pearl ,
platinum ,
heartgold ,
soulsilver ,
black ,
white ,
black2 ,
white2 ,
};

// Corección en los nombres de los Pokémon

export const cleanName = ( name ) => {
    name = name.replace( /-f$/, '♀' ).replace( /-m$/, '♂' );
    return name.split( '-' ).map( word => word.charAt( 0 ).toUpperCase() + word.slice( 1 )).join( '-' );
  }



//* Función para traducir los nombres de los types *//
// La función siempre va a devolver un objeto con las propiedades type (nombre en inglés) y spType (su traducción)

export const translateTypes = (input) => {
    // Verificar si se ingresa un array de types o un string con un solo type
    if (Array.isArray(input)) {
        // Si es un array, mapear y traducir cada type
        return input.map((type) => {
            const spType = typeNames[type] || type;
            return { type, spType };
        });
    } else {
        // Si es un solo type, traducirlo directamente
        const spType = typeNames[input] || input;
        return { type: input, spType };
    }
};



//* Función para obtener la información principal del Pokémon *//
// Esta función devuelve toda la data inicial del Pokémon. Se usa en los hooks usePokemonDetail y usePokemonCard

export const fetchBasicData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        console.warn("Error al obtener información")
    }
    const basicData = await response.json();

    const {
        name: pokeName,
        stats = [
            { base_stat: 1, stat: { name: "hp" } },
            { base_stat: 1, stat: { name: "attack" } },
            { base_stat: 1, stat: { name: "defense" } },
            { base_stat: 1, stat: { name: "special-attack" } },
            { base_stat: 1, stat: { name: "special-defense" } },
            { base_stat: 1, stat: { name: "speed" } }
        ],
        id,
        weight: defaultWeight,
        height: defaultHeight,
        types,
        is_default = false,
        abilities: abis,
        moves: moveNames,
        game_indices,
        sprites: {
            other: {
                "official-artwork": {
                    front_default: defaultImage,
                    front_shiny: defaultImageShiny
                }
            },
            front_default: defaultSprite
        }
    } = basicData;

    const games = game_indices.map((game) => (game.version.name).replace(/-/g, ''));
    const name = cleanName(pokeName)
    const moves = (moveNames.map((move) => cleanName(move.move.name)) || []);
    const weight = defaultWeight ?? "??";
    const height = defaultHeight ?? "??";
    const enTypes = types?.map(({ type }) => type.name) || ["unknown"];
    const spTypes = translateTypes(enTypes) ?? [{ type: "unknown", spType: "DESCONOCIDO" }];
    const sprite = defaultSprite ?? missingno;
    const image = defaultImage ?? missingbig;
    const imageShiny = defaultImageShiny ?? missingbig;
    const abilities = (abis?.map((ability) => cleanName(ability?.ability?.name)) || []);

    // El primer type me permite colorear algunos elementos como fondos o barras de progreso según el tipo del Pokémon
    const firstType = spTypes[0].type;

    return { name, stats, abilities, weight, height, id, enTypes, spTypes, is_default, sprite, image, moves, firstType, imageShiny, games }

}



//* Función para obtener información complementaria a partir de ID (descripción, genera, nombre en japonés, url de cadena evolutiva) *//
// Esta función se usa en el hook usePokemonDetail

export const fetchSpeciesData = async (id) => {

    const response = await fetch(`${urlBase}/pokemon-species/${id}`);

    if (!response.ok) {
        // Si la respuesta no es exitosa, se redirige al path '/'
        // Esto es útil ya que el ID se obtiene por useParams, y si se ingresa cualquier id aleatorio regresará al inicio
        window.location.href = '/';
        return;
    }
    const speciesData = await response.json();

    // Descripción del Pokémon en inglés
    const englishEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === "en");
    const desc = englishEntry ? englishEntry.flavor_text : "???";

    // Categoría del Pokémon en inglés (genera) y nombre en japonés
    const { genus: genera = "???" } = speciesData.genera.find(item => item.language.name === "en") || {};
    const japaneseName = speciesData.names[0]?.name ?? "???";

    // Url para obtener cadena evolutiva
    const { evolution_chain: { url: evoUrl } } = speciesData;

    return { evoUrl, desc, genera, japaneseName };
}



//* Función para obtener datos de la cadena evolutiva *//
// Esta función se usa en el hook usePokemonDetail para obtener cada fase evolutiva de un Pokémon, con su nombre, id, e imagen
// Recibe url obtenida en fetchSpeciesData y los datos del Pokémon del que se quiere conocer su evolución

export const fetchEvolutionChain = async ( evourl, name, image, id ) => {
    if ( !evourl ) {
        // Si evoUrl es null o undefined, crea un evolutionChain por defecto únicamente con los datos del Pokémon elegido
        const defaultEvolutionChain = [{ name, image, id }];
        return defaultEvolutionChain;
    }

    const evolutionResponse = await fetch( evourl );
    const evolutionData = await evolutionResponse.json();

    // Llama a función processEvolutionChain, detallada más abajo
    const evolutionChain = await processEvolutionChain( evolutionData );
    return evolutionChain;
};

const processEvolutionChain = async ( evolutionData ) => {
    // La función me va a devolver un array
    const evolutionChain = [];

    // Esta función me permite obtener el ID de un Pokémon que forma parte de la cadena evolutiva a partir de la URL
    const getIdFromUrl = ( url ) => {
        const idFromUrl = url.split( '/' );
        return idFromUrl[ idFromUrl.length - 2 ];
    };

    // Función para crear cada etapa evolutiva
    const getStage = async (stageData) => {
        const speciesId = getIdFromUrl(stageData.species.url);
        // Solicitud para obtener imagen
        const response = await fetch(`${urlBase}/pokemon/${speciesId}`)
        const data = await response.json();
        const imageUrl = data.sprites.front_default;

        // Cada etapa está conformada por nombre del Pokémon, su URL, su imagen en caso de tener, y su ID
        const stage = {
            name: cleanName(stageData.species.name),
            url: stageData.species.url,
            image: imageUrl ?? missingno,
            id: speciesId,
        };

        if (stageData.evolves_to && stageData.evolves_to.length > 0) {
            // Si hay evoluciones, se procesan como un subarray de "evolution"
            // Se crea una nueva etapa con las mismas propiedades. Si llega a haber otra evolución, se procesa dentro de otro array
            stage.evolution = [];
            for (const evolution of stageData.evolves_to) {
                stage.evolution.push(await getStage(evolution));
            }
        }

        return stage;
    };

    evolutionChain.push(await getStage(evolutionData.chain));

    return evolutionChain;
};

//* Función para solicitar únicamente el nombre de un Pokémon a partir de su id. *//
// Esta función se usa en el hook usePokemonDetail, para mostrar los nombres de los Pokémon que le siguen 

export const getMiniData = async (id) => {
    const response = await fetch(`${urlBase}/pokemon/${id}`);
    const miniData = await response.json();
    const name = cleanName(miniData.name);
    return { name, id }
}