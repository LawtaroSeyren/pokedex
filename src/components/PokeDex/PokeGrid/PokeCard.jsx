import React from 'react'
import { NavLink } from 'react-router-dom';

export const PokeCard = ( pokemon ) => {

  return (
    <NavLink className="pokecard" to={`/pokemon/${ pokemon.id }`} >
    <h2>{pokemon.name}</h2>
    <p>ID: {pokemon.id}</p>
    <img src={pokemon.sprite} alt={pokemon.name} />
    <p>
    {pokemon.spTypes.map(( {type, spType }) => <span key={type} className = { `typeBtn ${ type }` } >
            { spType }
        </span>)}
        </p>
  </NavLink>
  )
}