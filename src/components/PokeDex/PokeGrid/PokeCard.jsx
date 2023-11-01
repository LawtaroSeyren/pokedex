import React from 'react'
import { NavLink } from 'react-router-dom';

export const PokeCard = ({ name, id, sprite, spTypes }) => {
  return (
    <NavLink className="pokecard" to={`/pokemon/${ id }`} >
    <h2>{name}</h2>
    <p>ID: {id}</p>
    <img src={sprite} alt={name} />
    <p>
    {spTypes.map(( {type, spType }) => <span key={type} className = { `typeBtn ${ type }` } >
            { spType }
        </span>)}
        </p>
  </NavLink>
  )
}