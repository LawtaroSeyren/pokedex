import * as comp from '../../../'

export const StatsDetail = ({ genera, desc, stats, weight, abilities, height, firstType }) => {

  return (
    <>
      <h3 className="genera">{ genera }</h3>
      <p className="description-detail">{ desc }</p>
      <hr />

      <comp.StatsBar stats={ stats } fill={ firstType }/>

      <p className="stats-title">PESO:</p> <p>{ weight / 10 } KG</p>
      <p className="stats-title"> ALTURA: </p> <p>{ height / 10 } M.</p>
      <p className="stats-title"> HABILIDADES: </p>
      {abilities.map(( name, index ) => (
        <span className="abilities" key={ index }>{ name }</span>
      ))}
    </>
  )
}
