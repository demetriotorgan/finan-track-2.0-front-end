import React from 'react'
import '../Styles/Menu.css'
import { Link } from 'react-router-dom';
import {
  Wallet,
  BarChart3,
  PieChart,
  Layers
} from 'lucide-react';

const Menu = () => {
  return (
     <div className="menu-container">
      <Link to="/gasto" className="menu-card">
        <Wallet size={42} />
        <span>Gasto</span>
      </Link>

      <Link to="/resumo" className="menu-card">
        <BarChart3 size={42} />
        <span>Resumo</span>
      </Link>

      <Link to="/graficos" className="menu-card">
        <PieChart size={42} />
        <span>Gráficos</span>
      </Link>

      <Link to="/categorias" className="menu-card">
        <Layers size={42} />
        <span>Categorias</span>
      </Link>
    </div>
  )
}

export default Menu