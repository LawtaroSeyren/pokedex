import React from 'react'

export const Evolution = ({evolutionChain}) => {

    console.log(evolutionChain)
    
    const renderEvolution = ( evoChain ) => {
        if (!evoChain || evoChain.length === 0) {
          return null;
        }
    
        const firstEvolution = evoChain[0];
        const { name, image, evolution, id } = firstEvolution;
    
        return (
          <React.Fragment>
            <div >
              <img src={ image } alt={ name }  onClick={() => {setCurrentId( id ) } } />
              <p> { name } #{ id } </p> 
            </div>
            {evolution && evolution.length > 0 ? (
              <React.Fragment>
                <span>→</span>
                {evolution.map( ( evo, index ) => (
                  <React.Fragment key={ index }>{ renderEvolution ( [ evo ] ) }</React.Fragment>
                ))}
              </React.Fragment>
            ) : null }
          </React.Fragment>
        );
      };
    
    
      return <>              
      <div >
        { renderEvolution( evolutionChain ) }
        </div>
        </>

}
