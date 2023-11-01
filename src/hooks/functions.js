export const urlBase = "https://pokeapi.co/api/v2"

export { useTypes } from './useTypes'
export { usePokemonCard } from './usePokemonCard'
export { usePokemonDetail } from './usePokemonDetail'

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
    if(!response.ok){
        console.warn("Error al obtener información")
    }
    const basicData = await response.json();

    const {
        name,
        stats = [
            { base_stat: 1, stat: { name: "hp" } },
            { base_stat: 1, stat: { name: "attack" } },
            { base_stat: 1, stat: { name: "defense" } },
            { base_stat: 1, stat: { name: "special-attack" } },
            { base_stat: 1, stat: { name: "special-defense" } },
            { base_stat: 1, stat: { name: "speed" } }
        ],
        id,
        weight,
        height,
        types,
        is_default = false,
        abilities: abis,
        sprites: {
            other: {
                "official-artwork": {
                    front_default: defaultImage,
                }
            },
            front_default: defaultSprite
        }
    } = basicData;

    const enTypes = types?.map(({ type }) => type.name) || ["unknown"];
    const spTypes = translateTypes(enTypes) ?? [{ type: "unknown", spType: "DESCONOCIDO" }];
    const sprite = defaultSprite;
    const image = defaultImage;
    const abilities = (abis?.map((ability) => ability?.ability?.name) || []);

    return { name, stats, abilities, weight, height, id, enTypes, spTypes, is_default, sprite, image }

}
