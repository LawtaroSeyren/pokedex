import * as comp from '../'


export const Error = () => {
    return (
        <>
            <comp.Header />
            <div className="container">
                <h1>Ups... la página no existe :(</h1>
                <img src={comp.error404} />
            </div>
        </>
    )
}
