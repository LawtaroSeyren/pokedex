import React from 'react';
import { usePokemonCard } from '../../../hooks/usePokemonCard';
import * as comp from '../../'

export const PokeGrid = ({selectedType}) => {
  const [ pokemonList, isLoading ] = usePokemonCard(selectedType);

  return (
<div className="pokemon-list">
      {isLoading ? (
        <comp.Loader/>
      ) : (
        
        pokemonList.map((pokemon) => (
         <comp.PokeCard key={ pokemon.id } { ...pokemon }/>
        ))


      )}
    </div>
  );
};