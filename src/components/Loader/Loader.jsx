import pokeball from '../../assets/pokeball.png'

const Loader = () => {
  return (
    <>
      <img src={ pokeball } className="rotating-image" />
      <h2>Cargando...</h2>
      </>
  )
}

export default Loader;