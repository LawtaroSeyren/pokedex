export const urlBase = "https://pokeapi.co/api/v2"

export { useTypes } from './useTypes'
export { usePokemonCard } from './usePokemonCard'
export { usePokemonDetail } from './usePokemonDetail'

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

// Corección en los nombres de los Pokémon

const cleanName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
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
        sprites: {
            other: {
                "official-artwork": {
                    front_default: defaultImage,
                }
            },
            front_default: defaultSprite
        }
    } = basicData;

    const name = cleanName(pokeName)
    const moves = (moveNames.map((move) => cleanName(move.move.name)) || []);
    const weight = defaultWeight ?? "??";
    const height = defaultHeight ?? "??";
    const enTypes = types?.map(({ type }) => type.name) || ["unknown"];
    const spTypes = translateTypes(enTypes) ?? [{ type: "unknown", spType: "DESCONOCIDO" }];
    const sprite = defaultSprite;
    const image = defaultImage;
    const abilities = (abis?.map((ability) => cleanName(ability?.ability?.name)) || []);

    return { name, stats, abilities, weight, height, id, enTypes, spTypes, is_default, sprite, image, moves }

}

//* Función para obtener información complementaria a partir de ID (descripción, genera, nombre en japonés, url de cadena evolutiva) *//

export const fetchSpeciesData = async (id) => {

    const response = await fetch(`${urlBase}/pokemon-species/${id}`);

    if (!response.ok) {
        // Si la respuesta no es exitosa, se redirige al path '/'
        // Esto es útil ya que el ID se obtiene por useParams, y si se ingresa cualquier id aleatorio se regresará al inicio
        window.location.href = '/';
        return;
    }
    const speciesData = await response.json();

    const englishEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === "en");
    const desc = englishEntry ? englishEntry.flavor_text : "???";

    // Categoría del Pokémon en inglés (genera) y nombre en japonés
    const { genus: genera = "???" } = speciesData.genera.find(item => item.language.name === "en") || {};
    const japaneseName = speciesData.names[0]?.name ?? "???";

    // Url para obtener cadena evolutiva
    const { evolution_chain: { url: evoUrl } } = speciesData;

    return { evoUrl, desc, genera, japaneseName };
}

//*  *//

export const fetchEvolutionChain = async ( evourl, name, image, id  ) => {
    if (!evourl) {
      // Si evoUrl es null o undefined, crea un evolutionChain por defecto
      const defaultEvolutionChain = [{ name, image, id }];
      return defaultEvolutionChain;
    }
  
    const evolutionResponse = await fetch( evourl );
    const evolutionData = await evolutionResponse.json();
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
  
    const getStage = async ( stageData ) => {
      const speciesId = getIdFromUrl( stageData.species.url );
      // Fetch para obtener imagen
      const response = await fetch(`${urlBase}/pokemon/${speciesId}`)
      const data = await response.json();
      const imageUrl = data.sprites.front_default;
      const stage = {
        name: cleanName( stageData.species.name ),
        url: stageData.species.url,
        image: imageUrl ?? missingno,
        id: speciesId,
      };
  
      if ( stageData.evolves_to && stageData.evolves_to.length > 0 ) {
        // Si hay evoluciones, se procesan como un subarray de "evolution"
        stage.evolution = [];
        for ( const evolution of stageData.evolves_to ) {
          stage.evolution.push( await getStage( evolution ) );
        }
      }

      return stage;
    };
  
    evolutionChain.push( await getStage( evolutionData.chain ) );
  
    return evolutionChain;
  };

  export const getMiniData = async( id ) => {
    const response = await fetch( `${urlBase}/pokemon/${id}` );
    const miniData = await response.json();
    const name = cleanName( miniData.name );
    return { name, id }
  }