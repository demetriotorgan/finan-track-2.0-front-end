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
import { Activity, Flag, Wallet } from 'lucide-react';
import { usecarregarObjetivo } from '../Hooks/useCarregarObjetivo';
import { useExcluirObjetivo } from '../Hooks/useExcluirObjetivo';
import CardObjetivo from './CardObjetivo';
import StatusBanco from './StatusBanco';
import Carregando from './Carregando';
import { useCarregarCartoes } from '../Hooks/useCarregarCartoes';
import { useSalvarCartao } from '../Hooks/useSalvarCartao';
import { useExcluirCartao } from '../Hooks/useExcluirCartao';
import CardCartao from './CardCartao';


const Menu = () => {
  const { cartoes, carregarCartoes, carregandoCartoes } = useCarregarCartoes();
  const { excluindoCartao, excluirCartao } = useExcluirCartao({ carregarCartoes });

  const { carregarRegistros, carregandoRegistros } = useCarregarRegistros();
  const { monitoramentos, carregarMonitoramentos, carregandoMonitoramento } = useCarregarMonitoramento();
  const { excluindoMonitoramento, excluirMonitoramento } = useExcluirMonitoramento({ carregarMonitoramentos });

  const { objetivos, loading, carregarObjetivos } = usecarregarObjetivo();
  const { excluindoObjetivo, excluirObjetivo } = useExcluirObjetivo({ carregarObjetivos });

  return (
    <>
      <StatusBanco />
      <div className="menu-container">
        <MenuGrid />
      </div>
      
      <div>
        <CardCartao
          cartoes={cartoes}
          registros={carregarRegistros}
          carregandoCartoes={carregandoCartoes}
          excluindoCartao={excluindoCartao}
          excluirCartao={excluirCartao}
        />
      </div>

      {/* ---Monitoramento--- */}
      <div className='container'>
        <h3><Activity /> Monitoramento</h3>
        {carregandoMonitoramento && <Carregando />}
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
                carregandoMonitoramento={carregandoMonitoramento}
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
        {loading && <Carregando />}
        <CardObjetivo
          objetivos={(objetivos || []).slice(0, 2)}
          loading={loading}
          excluirObjetivo={excluirObjetivo}
        />
      </div>

      {/* ---Card-Recentes--- */}
      <div className='container'>
        {carregandoRegistros && <Carregando />}
        <UltimosRegistros />
      </div>
    </>
  )
}

export default Menu