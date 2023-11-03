import React from 'react'

export const MoveBadge = ({moves}) => {
  return (
    <>
    <h3>MOVIMIENTOS</h3>
    <div className="moves-container">
      {moves.map((move, index) => (
        <div key={index} className={index % 2 === 0 ? 'move1' : 'move2'}>
          {move}
        </div>
      ))}
    </div>
    </>
  )
}
