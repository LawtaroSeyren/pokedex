import { urlBase, fetchBasicData, fetchSpeciesData, getMiniData, fetchEvolutionChain } from './functions';
import { useState, useEffect } from 'react';

//El hook recibe un ID como parámetro
export const usePokemonDetail = ( id ) => {

    // Controlo el estado de carga, de toda la info del Pokémon, su cadena evolutiva, y las criaturas que le siguen en la Pokédex
    const [ isLoading, setIsLoading ] = useState( true );
    const [ pokemonData, setPokemonData ] = useState({ spTypes: [], stats: [], abilities: [], moves: [], games: [] });
    const [ evolutionChain, setEvolutionChain ] = useState([]);
    const [ prevPokemon, setPrevPokemon ] = useState( null );
    const [ nextPokemon, setNextPokemon ] = useState( null );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pokemonUrl = `${ urlBase }/pokemon/${ id }`;
                
                // Llamo a las dos funciones para solicitar info primaria y secundaria del Pokémon
                const [ basicData, speciesData ] = await Promise.all([
                    fetchBasicData( pokemonUrl ),
                    fetchSpeciesData( id ),
                ]);

                // Combino los datos obtenidos y los almaceno en el estado pokemonData
                const combinedData = { ...basicData, ...speciesData };
                setPokemonData( combinedData )

                // Hago la petición para obtener la cadena evolutiva a través de la función fetchEvolutionChain y lo almaceno en el estado evolutionChain
                // Además de la url de la evolución se le pasan datos concretos del pokémon en cuestión (nombre, sprite e id)
                const evolution = await fetchEvolutionChain( combinedData.evoUrl, combinedData.name, combinedData.sprite, combinedData.id );
                setEvolutionChain( evolution );

                // A partir de acá, obtengo el Pokémon anterior y el Pokémon que le sigue en la Pokédex:
                // Convierto el id en un número entero para poder realizar operaciones matemáticas
                const idNumber = parseInt( id );

                // Si el valor del ID es mayor a 1, hago una solicitud a la PokéApi del Pokémon anterior al actual ( ID - 1)
                if (!isNaN( idNumber ) && idNumber > 1) {
                    const prevPokemonData = await getMiniData( idNumber - 1 );
                    setPrevPokemon( prevPokemonData ); // Almaceno su información en prevPokemonData
                } else {
                    setPrevPokemon( false ); // Si el número es 1, no almaceno nada
                }

                // Ahora intento hacer una solicitud a la PokéApi del Pokémon siguiente al actual ( ID - 1)
                try {
                    // Si dicho Pokémon existe, almaceno la información en nextPokemonData
                    const nextPokemonData = await getMiniData( idNumber + 1 );
                    setNextPokemon( nextPokemonData );
                } catch ( error ) {
                    setNextPokemon( false ); // En caso contrario, no almaceno nada
                }

                setIsLoading( false );
            } catch ( error ) {
                setIsLoading( false );
            }
        };

        fetchData()
    }, [ id ]);

    return { pokemonData, isLoading, evolutionChain, nextPokemon, prevPokemon };
};