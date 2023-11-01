import { urlBase, fetchBasicData, fetchSpeciesData, getMiniData, fetchEvolutionChain } from './functions';
import { useState, useEffect } from 'react';

export const usePokemonDetail = (id) => {
    const [isLoading, setIsLoading] = useState(true);
    const [pokemonData, setPokemonData] = useState({ spTypes: [], stats: [], abilities: [], moves: [] });
    const [ evolutionChain, setEvolutionChain ] = useState( [] );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pokemonUrl = `${urlBase}/pokemon/${id}`;

                const [basicData, speciesData] = await Promise.all([
                    fetchBasicData(pokemonUrl),
                    fetchSpeciesData(id),
                ]);

                const combinedData = { ...basicData, ...speciesData };
                setPokemonData(combinedData)

                // //
                const evolution = await fetchEvolutionChain(combinedData.evoUrl, combinedData.name, combinedData.sprite, combinedData.id);
                setEvolutionChain(evolution);



                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        fetchData()
    }, [id]);

    return { pokemonData, isLoading, evolutionChain };
};