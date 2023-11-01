import { urlBase, fetchBasicData, fetchSpeciesData } from './functions';
import { useState, useEffect } from 'react';

export const usePokemonDetail = (id) => {
    const [isLoading, setIsLoading] = useState(true);
    const [pokemonData, setPokemonData] = useState({ spTypes: [], stats: [], abilities: [], moves: []});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pokemonUrl = `${urlBase}/pokemon/${id}`;

                const [basicData, speciesData ] = await Promise.all([
                    fetchBasicData(pokemonUrl),
                    fetchSpeciesData( id ),
                ]);

                const combinedData = {...basicData, ...speciesData};
                setPokemonData(combinedData)

                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        fetchData()
    }, [id]);

    return { pokemonData, isLoading };
};