import React from 'react'
import * as comp from '../../'
import { NavLink } from 'react-router-dom';

export const PokeCard = ( pokemon ) => {

  return (
    <NavLink className="pokecard" to={`/pokemon/${ pokemon.id }`} >
      <img src={ pokemon.sprite } alt={ pokemon.name } />
      <h2>{ pokemon.name }</h2> 
      <p className="pokemon-id">NRO #{ pokemon.id }</p>
      <p>
      {pokemon.spTypes.map(( {type, spType }) => (
        < comp.TypeBadge key={ type } type={ type } spType={ spType } />
      ))}
      </p>
    </NavLink>
  )
}