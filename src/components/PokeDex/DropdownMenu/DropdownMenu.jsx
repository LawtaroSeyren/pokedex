import React from 'react'

const DropdownMenu = ({ selectedType, onTypeChange, types }) => {

    console.log(types)

    return (
        <div>
            <h2>Selecciona un tipo:</h2>
            <div>
                <select onChange={onTypeChange} value={selectedType} >
                    <option value="todos">TODOS LOS TIPOS</option>
                    { types.map( ( type ) => (
                        <option value={ type } key = { type } >{type}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default DropdownMenu