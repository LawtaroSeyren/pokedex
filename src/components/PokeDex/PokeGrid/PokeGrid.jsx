import React from 'react';
import { usePokemonCard } from '../../../hooks/usePokemonCard';
import PokeCard from './PokeCard';
import Loader from '../../Loader/Loader';

const PokeGrid = ({selectedType}) => {
  const [ pokemonList, isLoading ] = usePokemonCard(selectedType);

  return (
<div className="pokemon-list">
      {isLoading ? (
        <Loader/>
      ) : (
        
        pokemonList.map((pokemon) => (
         <PokeCard key={ pokemon.id } { ...pokemon }/>
        ))


      )}
    </div>
  );
};

export default PokeGrid;