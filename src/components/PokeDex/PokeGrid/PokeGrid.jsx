import React from 'react';
import { usePokemonCard } from '../../../hooks/usePokemonCard';
import PokeCard from './PokeCard';

const PokeGrid = ({selectedType}) => {
  const [ pokemonList, isLoading ] = usePokemonCard(selectedType);

  return (
<div>
      {isLoading ? (
        <h2>Cargando...</h2>
      ) : (
        
        pokemonList.map((pokemon) => (
         <PokeCard key={ pokemon.id } { ...pokemon }/>
        ))


      )}
    </div>
  );
};

export default PokeGrid;