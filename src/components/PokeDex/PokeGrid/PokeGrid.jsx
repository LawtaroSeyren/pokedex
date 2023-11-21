import React from 'react';
import * as com from '../../';
import { usePokemonList } from '../../../hooks/functions';

export const PokeGrid = (selectedType) => {
  const { pokemonList, isLoading, error } = usePokemonList(selectedType);

  return (
    <div className="pokemon-list">
      {error ? (
        <h2>{error}</h2>
      ) : (
        <>
          {pokemonList.map((pokemon) => (
            <com.PokeCard key={pokemon.id} {...pokemon} />
          ))}
          {isLoading && (
            <div className="loading-container">
              <com.Loader />
            </div>
          )}
        </>
      )}
    </div>
  );
};
