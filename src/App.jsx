import React, { useEffect, useState } from 'react';

const usePokemonCard = () => {
  const [pokemonList, setPokemonList] = useState([]);
  

  useEffect(() => {
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
      }
    };

    fetchPokemonData();
  }, []);

  return pokemonList;
};

const App = () => {
  const pokemonList = usePokemonCard();

  return (
    <div>
      {pokemonList.map(pokemon => (
        <div key={pokemon.id}>
          <h2>{pokemon.name}</h2>
          <p>ID: {pokemon.id}</p>
          <img src={pokemon.sprite} alt={pokemon.name} />
          {pokemon.types.map((type) => <p key={type}>{type}</p> )}
        </div>
      ))}
    </div>
  );
};

export default App;