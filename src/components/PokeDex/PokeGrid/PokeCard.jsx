import React from 'react'
import { NavLink } from 'react-router-dom';

const PokeCard = ({ name, id, sprite, types }) => {
  return (
    <NavLink to={`/pokemon/${ id }`} >
    <div key={id}>
    <h2>{name}</h2>
    <p>ID: {id}</p>
    <img src={sprite} alt={name} />
    {types.map((type) => <p key={type}>{type}</p>)}
  </div>
  </NavLink>
  )
}

export default PokeCard