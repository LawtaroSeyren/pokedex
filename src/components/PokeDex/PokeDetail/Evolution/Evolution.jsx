import React from 'react'

export const Evolution = ({ evolutionChain, setCurrentId, firstType }) => {

  // Añado variaciones de colores según el type del Pokémon para que haya contrastes
  const darkTypes = ["dark", "dragon", "fighting", "ghost"];
  const isDarkType = darkTypes.includes(firstType);
  const evolutionTitleClass = isDarkType ? "evolution-title" : null;
  const evolutionChainClass = isDarkType ? "evolution-chain dark-chain" : "evolution-chain";

  const renderEvolution = (evoChain) => {
    if (!evoChain || evoChain.length === 0) {
      return null;
    }

    const firstEvolution = evoChain[0];
    const { name, image, evolution, id } = firstEvolution;

    return (
      <React.Fragment>
        <div className="evolution-stage" >
        <img src={ image } alt={ name } className="evolution-image" onClick={() => {setCurrentId( id ) } } />
        <p className="evolution-name"> { name } #{ id } </p> 
        </div>
        {evolution && evolution.length > 0 ? (
          <React.Fragment>
            <span>→</span>
            {evolution.map((evo, index) => (
              <React.Fragment key={index}>{renderEvolution([evo])}</React.Fragment>
            ))}
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  };


  return <>
    <h3 className={ evolutionTitleClass } >CADENA EVOLUTIVA</h3>
    <div className={ evolutionChainClass } >
      {renderEvolution(evolutionChain)}
    </div>
  </>

}
