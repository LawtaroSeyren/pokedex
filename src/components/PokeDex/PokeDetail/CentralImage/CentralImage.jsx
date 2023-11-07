import { useEffect, useState } from 'react';
import * as com from '../../..'

export const CentralImage = ({ name, image, spTypes, imageShiny }) => {

    // Manejo estados para cambiar la imagen del Pokémon entre versión normal y shiny
    const [ pokeImage, setPokeImage ] = useState( "" );

    useEffect( () => {
        setPokeImage( image )
      }, [ image ] )
    
      const toggleImage = () => {
          if ( pokeImage == image ) {
            setPokeImage( imageShiny )
          } else {
            setPokeImage( image )
      }
    }


    return (
        <>
            {
                // Muestro la imagen en grande del Pokémon
            }
            <div className="central-image-container">
                <span className="change-shiny" onClick={ toggleImage } >◀</span>
                <img className="central-image" src={ pokeImage } alt={ name } />
                <span className="change-shiny" onClick={ toggleImage } >▶</span>
            </div>

            {
                // Abajo muestro los tipos, y los botones para cambiar la imagen shiny del Pokémon si es que hay
            }

            <p>
                {spTypes.map(({ type, spType }) => (
                    <com.TypeBadge key={type} type={type} spType={spType} />
                ))}                
            </p>
        </>
    )
}
