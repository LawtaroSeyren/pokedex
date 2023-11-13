import { loaderSVG } from '../'

export const Loader = () => {
  return (
    <>
      <img src={ loaderSVG } className="rotating-image" />
      <h2>Cargando...</h2>
      </>
  )
}