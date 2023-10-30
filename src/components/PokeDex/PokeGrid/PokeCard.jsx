import React from 'react'

const PokeCard = ({ name, id, sprite, types }) => {
  return (
    <div key={id}>
    <h2>{name}</h2>
    <p>ID: {id}</p>
    <img src={sprite} alt={name} />
    {types.map((type) => <p key={type}>{type}</p>)}
  </div>
  )
}

export default PokeCard