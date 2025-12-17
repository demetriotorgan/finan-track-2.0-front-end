import React from 'react'
import '../Styles/Menu.css'
import '../Styles/ResumoGeral.css';
import '../Styles/CardMonitoramento.css';
import MenuGrid from './MenuGrid'
import RegistrosSalvos from './RegistrosSalvos'
import UltimosRegistros from './UltimosRegistros'
import { useCarregarMonitoramento } from '../Hooks/useCarregarMonitoramento';
import { calcularMonitoramento } from '../utils/calcularMonitoramento';
import CardMonitoramento from './CardMonitoramento';
import { useExcluirMonitoramento } from '../Hooks/useExcluirMonitoramento';
import { useCarregarRegistros } from '../Hooks/useCarregarRegistros';
import { Activity, Flag } from 'lucide-react';
import { usecarregarObjetivo } from '../Hooks/useCarregarObjetivo';
import { useExcluirObjetivo } from '../Hooks/useExcluirObjetivo';
import CardObjetivo from './CardObjetivo';
import StatusBanco from './StatusBanco';


const Menu = () => {
  const { carregarRegistros } = useCarregarRegistros();
  const { monitoramentos, carregarMonitoramentos } = useCarregarMonitoramento();
  const { excluindoMonitoramento, excluirMonitoramento } = useExcluirMonitoramento({ carregarMonitoramentos });

  const { objetivos, loading, carregarObjetivos } = usecarregarObjetivo();
  const { excluindoObjetivo, excluirObjetivo } = useExcluirObjetivo({ carregarObjetivos });

  return (
    <>
      <StatusBanco />
      <div className="menu-container">
        <MenuGrid />
      </div>

      {/* ---Monitoramento--- */}
      <div className='container'>
        <h3><Activity /> Monitoramento</h3>
        <div className='monitoramento-container'>
          {monitoramentos.length > 0 && (() => {
            const monitoramento = monitoramentos[0];

            const {
              percentualUsado,
              totalUsado,
              excedeuLimite
            } = calcularMonitoramento(monitoramento, carregarRegistros);

            return (
              <CardMonitoramento
                monitoramento={monitoramento}
                excluirMonitoramento={excluirMonitoramento}
                percentualUsado={percentualUsado}
                totalUsado={totalUsado}
                excedeuLimite={excedeuLimite}
              />
            );
          })()}
        </div>
      </div>

      {/* ---Objetivos--- */}
      <div className='container'>
        <h3><Flag /> Objetivos Recentes</h3>
        <CardObjetivo
          objetivos={(objetivos || []).slice(0, 2)}
          loading={loading}
          excluirObjetivo={excluirObjetivo}
        />
      </div>

      {/* ---Card-Recentes--- */}
      <div className='container'>
        <UltimosRegistros />
      </div>
    </>
  )
}

export default Menu