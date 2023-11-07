import React from 'react'

export const Evolution = ({ evolutionChain, setCurrentId, firstType }) => {

  // Añado variaciones de colores según el type del Pokémon para que haya contrastes
  const darkTypes = ["dark", "dragon", "fighting", "ghost", "poison"]; // Estos types se consideran de color oscuro
  const isDarkType = darkTypes.includes(firstType);
  const evolutionTitleClass = isDarkType ? "evolution-title" : null;
  const evolutionChainClass = isDarkType ? "evolution-chain dark-chain" : "evolution-chain";


  // Creo función para mostrar la cadena evolutiva
  // Si no hay datos en la cadena, no muestro nada
  const renderEvolution = ( evoChain ) => {
    if (!evoChain || evoChain.length === 0) {
      return null;
    }

    // Obtengo la información de la primera etapa evolutiva
    const firstEvolution = evoChain[0];
    const { name, image, evolution, id } = firstEvolution;

    return (
      <>
        {/* Retorno los datos obtenidos */}
        <div className="evolution-stage" >
          {/* Al clickear la imagen, cambio el ID del componente padre para poder ir a la info de ese Pokémon */}
          <img src={ image } alt={ name } className="evolution-image" onClick={() => {setCurrentId( id ) } } />
        <p className="evolution-name"> { name } #{ id } </p> 
        </div>
        { /* Si hay información dentro de la propiedad evolution, muestro una flecha, y hago recursión repitiendo la función y mostrando lo mismo */}
        {evolution && evolution.length > 0 ? (
          <>
            <span>→</span>
            {evolution.map((evo, index) => (
              <React.Fragment key={index}>
                {renderEvolution([evo])}
                </React.Fragment>
            ))}
          </>
        ) : null}
      </>
    );
  };


  return <>
  {/* Div con color de fondo del primer type del Pokémon */}
  <div className={ `bottom-bar ${ firstType }` }>
    <h3 className={ evolutionTitleClass } >CADENA EVOLUTIVA</h3>
    <div className={ evolutionChainClass } >
      {renderEvolution(evolutionChain)}
    </div>
    </div>
  </>

}
