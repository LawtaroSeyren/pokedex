import { urlBase, fetchBasicData, fetchSpeciesData, getMiniData, fetchEvolutionChain } from './functions';
import { useState, useEffect } from 'react';

export const usePokemonDetail = (id) => {
    const [isLoading, setIsLoading] = useState(true);
    const [pokemonData, setPokemonData] = useState({ spTypes: [], stats: [], abilities: [], moves: [] });
    const [evolutionChain, setEvolutionChain] = useState([]);
    const [prevPokemon, setPrevPokemon] = useState(null);
    const [nextPokemon, setNextPokemon] = useState(null);

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

                
                const evolution = await fetchEvolutionChain(combinedData.evoUrl, combinedData.name, combinedData.sprite, combinedData.id);
                setEvolutionChain(evolution);



                const idNumber = parseInt(id);

                if (!isNaN(idNumber) && idNumber > 1) {
                    const prevPokemonData = await getMiniData(idNumber - 1);
                    setPrevPokemon(prevPokemonData);
                } else {
                    setPrevPokemon(false);
                }

                try {
                    const nextPokemonData = await getMiniData(idNumber + 1);
                    setNextPokemon(nextPokemonData);
                } catch (error) {
                    setNextPokemon(false);
                }

                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        fetchData()
    }, [id]);

    return { pokemonData, isLoading, evolutionChain, nextPokemon, prevPokemon };
};