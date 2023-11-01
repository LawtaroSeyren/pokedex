import { urlBase, fetchBasicData } from './functions';
import { useState, useEffect } from 'react';

export const usePokemonDetail = (id) => {
    const [isLoading, setIsLoading] = useState(true);
    const [pokemonData, setPokemonData] = useState({ spTypes: [], stats: [], abilities: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pokemonUrl = `${urlBase}/pokemon/${id}`;

                const [basicData] = await Promise.all([
                    fetchBasicData(pokemonUrl),
                ]);

                setPokemonData(basicData);

                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        fetchData()
    }, [id]);

    return { pokemonData, isLoading };
};