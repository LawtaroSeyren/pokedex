import React from 'react';
import { usePokemonCard } from '../../../hooks/usePokemonCard';
import * as comp from '../../'

export const PokeGrid = ({ selectedType }) => {
  const [ pokemonList, isLoading, error ] = usePokemonCard( selectedType );

  return (
    <div className="pokemon-list">
      {isLoading ? (
        <div>
          <comp.Loader />
        </div>
      ) : error ? (
        <h2>{ error }</h2>
      ) : (
        pokemonList.map(( pokemon ) => <comp.PokeCard key={ pokemon.id } { ...pokemon } />)
      )}
    </div>
  );
};