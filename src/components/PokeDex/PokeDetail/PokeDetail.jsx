import React from 'react';
import { useSelector } from 'react-redux';
import * as comp from '../../';

export const PokeDetail = () => {
  const pokemonData = useSelector((state) => state.pokemon);

  return (
    <div>
      <comp.Header />
      {pokemonData ? (
        <div>
          <h1>{pokemonData.name}</h1>
          <p>ID: {pokemonData.id}</p>
          <img src={pokemonData.image} alt={pokemonData.name} />
          <p>
            {pokemonData.spTypes.map(({ type, spType }) => (
              <span key={type} className={`typeBtn ${type}`}>
                {spType}
              </span>
            ))}
          </p>
          <p >PESO:</p> <p>{ pokemonData.weight / 10 } KG</p>
          <p > ALTURA: </p> <p>{ pokemonData.height / 10 } M.</p>
              <p > HABILIDADES: </p>
                { pokemonData.abilities.map( ( name, index ) => (
                  <span key={ index }>{ name }</span> ))}
        </div>
      ) : (
        <comp.Loader />
      )}
    </div>
  );
};
