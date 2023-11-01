import { useState, useEffect } from 'react';
import { translateTypes, urlBase, fetchBasicData } from "./functions";

export const usePokemonCard = (selectedType) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`${urlBase}/pokemon?limit=3000&offset=0`);
        const { results } = await response.json();
        if (!response.ok) {
          throw new Error('Error al obtener lista de Pokémon');
        }

        const urls = results.map(result => result.url);
        const pokemonInfo = await Promise.all(urls.map(fetchBasicData));

        let filteredPokemon;

        if (selectedType === 'todos') {
          filteredPokemon = pokemonInfo.filter(pokemon => pokemon.is_default);
        } else {
          filteredPokemon = pokemonInfo.filter(pokemon =>
            pokemon.enTypes.includes(selectedType) && pokemon.is_default
          );
        }

        setPokemonList(filteredPokemon);
      } catch (error) {
        console.error('Error al obtener información de los Pokémon', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonData();
  }, [selectedType]);

  return [pokemonList, isLoading];
};
