import React from 'react'
import { translateTypes } from "../../../hooks/functions";

export const DropdownMenu = ({ selectedType, onTypeChange, types }) => {

    // Traduzco la lista completa de types, y el type seleccionado
    const spTypes = translateTypes( types );

    return (
        <div>
            <h2>Selecciona un tipo:</h2>
            <div>
                <select onChange={ onTypeChange } value={ selectedType } >
                    <option value="todos"> TODOS LOS TIPOS </option>
                    { spTypes.map( ( { type, spType }, index ) => (
                        <option value={ type } key = { index } > { spType } </option>
                    ))}
                </select>
            </div>
        </div>
    )
}