import { NavLink } from 'react-router-dom'
import { logo }  from '../'

export const Header = () => {
  return (
    <div className="header">
        <NavLink to={ "/" }><img src={ logo } alt="Logo de PokeApp" className="logo-app" /></NavLink>
    </div>
  )
}