import React from 'react'

const DropdownMenu = ({ selectedType, onTypeChange }) => {
    return (
        <div>
            <h2>Selecciona un tipo:</h2>
            <div>
                <select onChange={ onTypeChange } value={ selectedType } >
                    <option value="todos">TODOS LOS TIPOS</option>
                    <option value="agua">AGUA</option>
                    <option value="fuego">FUEGO</option>
                    <option value="tierra">TIERRA</option>
                </select>
            </div>
        </div>
    )
}

export default DropdownMenu