import React from 'react'
import { Link } from 'react-router-dom';
import {Wallet, BarChart3, PieChart, Layers, NotebookText, Target } from 'lucide-react';

const MenuGrid = () => {
  return (
    <>
    <Link to="/gasto" className="menu-card">
        <Wallet size={42} />
        <span>Novo Gasto</span>
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

      <Link to="/registrosSalvos" className="menu-card">
        <NotebookText  size={42} />
        <span>Registros</span>
      </Link>

      <Link to="/objetivos" className="menu-card">
        <Target  size={42} />
        <span>objetivos</span>
      </Link>

      
      </>
  )
}

export default MenuGrid