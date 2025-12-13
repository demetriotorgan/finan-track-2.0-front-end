import React from 'react'
import '../Styles/Menu.css'
import MenuGrid from './MenuGrid'
import RegistrosSalvos from './RegistrosSalvos'
import UltimosRegistros from './UltimosRegistros'


const Menu = () => {
  return (
    <>
    <div className="menu-container">
      <MenuGrid />      
    </div>
    <div className='container'>
      <UltimosRegistros />
    </div>
    </>
  )
}

export default Menu