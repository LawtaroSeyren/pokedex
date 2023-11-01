import React from 'react'

export const MoveBadge = ({moves}) => {
  return (
    <div className="moves-container">
      {moves.map((move, index) => (
        <div key={index} className={index % 2 === 0 ? 'rojo' : 'azul'}>
          {move}
        </div>
      ))}
    </div>
  )
}
