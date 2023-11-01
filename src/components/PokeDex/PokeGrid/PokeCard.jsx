import React from 'react'
import * as comp from '../../'
import { NavLink } from 'react-router-dom';

export const PokeCard = ( pokemon ) => {

  return (
    <NavLink className="pokecard" to={`/pokemon/${ pokemon.id }`} >
    <h2>{pokemon.name}</h2>
    <p>ID: {pokemon.id}</p>
    <img src={pokemon.sprite} alt={pokemon.name} />
    <p>
    {pokemon.spTypes.map(( {type, spType }) => (
      < comp.TypeBadge key={ type } type={ type } spType={ spType } />
    ) )}
        </p>
  </NavLink>
  )
}