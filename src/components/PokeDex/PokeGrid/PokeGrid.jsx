import React from 'react';
import { usePokemonCard } from '../../../hooks/usePokemonCard';

const PokeGrid = ({selectedType}) => {
  const [ pokemonList, isLoading ] = usePokemonCard(selectedType);

  return (
<div>
      {isLoading ? (
        <h2>Cargando...</h2>
      ) : (
        pokemonList.map(pokemon => (
          <div key={pokemon.id}>
            <h2>{pokemon.name}</h2>
            <p>ID: {pokemon.id}</p>
            <img src={pokemon.sprite} alt={pokemon.name} />
            {pokemon.types.map((type) => <p key={type}>{type}</p>)}
          </div>
        ))
      )}
    </div>
  );
};

export default PokeGrid;