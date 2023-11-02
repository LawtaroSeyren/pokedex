import * as com from '../../..'

export const CentralImage = ({ name, image, spTypes }) => {


    return (
        <>
            {
                // Muestro la imagen en grande del Pokémon
            }
            <div className="central-image-container">
                <img className="central-image" src={image} alt={name} />
            </div>

            {
                // Abajo muestro los tipos
            }

            <p>
                {spTypes.map(({ type, spType }) => (
                    <com.TypeBadge key={type} type={type} spType={spType} />
                ))}
            </p>
        </>
    )
}
