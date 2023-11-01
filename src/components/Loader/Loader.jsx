import { loader } from '../'

export const Loader = () => {
  return (
    <>
      <img src={ loader } className="rotating-image" />
      <h2>Cargando...</h2>
      </>
  )
}