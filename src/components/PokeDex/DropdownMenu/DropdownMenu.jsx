import * as comp from '../../'
import { translateTypes } from "../../../hooks/functions";

export const DropdownMenu = ({ selectedType, onTypeChange, types }) => {

    // Traduzco la lista completa de types, y el type seleccionado
    const spTypes = translateTypes( types );
    const { spType } = translateTypes( selectedType );

    return (
        <div className="dropdown-menu">
            <h2>Selecciona un tipo:</h2>
            <div>
                <select onChange={ onTypeChange } value={ selectedType } >
                    <option value="todos"> TODOS LOS TIPOS </option>
                    { spTypes.map( ( { type, spType }, index ) => (
                        <option value={ type } key = { index } > { spType } </option>
                    ))}
                </select>
            </div>
            <h3 >Mostrando { spType }</h3>
            <div className = "type-selected" >
                        
                {/* Si se selecciona la opción por defecto, se muestran todas las medallas de los types */}
                {/* Si se elige cualquier type individual, solo se muestra su medalla */}
                { selectedType === "todos" ? (
                    spTypes.map( ( { type, spType }, index ) => (
                        <comp.TypeBadge key = { index } type = { type } spType = { spType } />
                    ))
                ) : (
                    <comp.TypeBadge key = { selectedType } type = { selectedType } spType = { spType } />
                )}
            </div>

        </div>
    )
}