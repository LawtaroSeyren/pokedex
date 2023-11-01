import React from 'react'
import { NavLink } from 'react-router-dom';

export const PokeCard = ({ name, id, sprite, types }) => {
  return (
    <NavLink className="pokecard" to={`/pokemon/${ id }`} >
    <h2>{name}</h2>
    <p>ID: {id}</p>
    <img src={sprite} alt={name} />
    <p>
    {types.map((type) => <span key={type} className = { `typeBtn ${ type }` } >
            { type }
        </span>)}
        </p>
  </NavLink>
  )
}