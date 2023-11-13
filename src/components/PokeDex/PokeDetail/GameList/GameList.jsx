import { gameCovers, cleanName } from '../../../../hooks/functions'

export const GameList = ({ games }) => {
    if ( games.length === 0 ) {
        return null;
    }

    return (
        <>
            <h3>LISTA DE JUEGOS</h3>
            <div className="game-list">
                { games.map(( game, index ) => (
                    <div key={ index } className="gamecard">
                        <img src={ gameCovers[ game ] } alt="" />
                        <p>Pokémon { cleanName( game ) }</p>
                    </div>
                ))}
            </div>
        </>
    );
}