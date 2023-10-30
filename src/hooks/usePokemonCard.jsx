import { useState, useEffect } from 'react';

export const usePokemonCard = () => {
    const [ pokemonList, setPokemonList ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    
  
    useEffect(() => {
        setIsLoading(true);
      const fetchPokemonData = async () => {
        try {
          const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=3000&offset=0');
          const data = await response.json();
          const urls = data.results.map(result => result.url);
          const pokemonInfo = await Promise.all(urls.map(url => fetch(url).then(response => response.json())));
          const basicPokemonInfo = pokemonInfo.map(pokemon => ({
            id: pokemon.id,
            name: pokemon.name,
            sprite: pokemon.sprites.front_default,
            types: pokemon.types.map(type => type.type.name),
          }));
  
          setPokemonList(basicPokemonInfo);
        } catch (error) {
          console.error('Error al obtener información de los Pokémon', error);
        } finally {
        setIsLoading(false);

        }
      };
  
      fetchPokemonData();
    }, []);
  
    return [ pokemonList, isLoading ];
  };