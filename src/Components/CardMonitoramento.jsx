import React from 'react'
import { isoToDate } from '../utils/time'
import { mesPorNumero } from '../utils/mesPorNumero'
import BarraLimite from './BarraLimite'
import { Trash } from 'lucide-react'
import Carregando from './Carregando'

const CardMonitoramento = ({ monitoramento, excluirMonitoramento, percentualUsado, totalUsado, excedeuLimite }) => {
  return (
    <>      
      <div key={monitoramento._id} className="card-monitoramento">
        <h4 className="monitoramento-titulo">
          {monitoramento.descricao}
          <button
            className="btn-trash"
            onClick={() => excluirMonitoramento(monitoramento._id)}
          >
            <Trash />
          </button>
        </h4>

        {/* Grupo 1 – Data e Período */}
        <div className="monitoramento-grupo">
          <div>
            <span>Data</span>
            <strong>{isoToDate(monitoramento.data)}</strong>
          </div>
          <div>
            <span>Período</span>
            <strong>{mesPorNumero(monitoramento.periodo)}</strong>
          </div>
        </div>

        {/* Grupo 2 – Tipo e Limite */}
        <div className="monitoramento-grupo">
          <div>
            <span>Tipo</span>
            <strong>{monitoramento.tipo}</strong>
          </div>
          <div>
            <span>Limite</span>
            <strong>R$ {monitoramento.limite}</strong>
          </div>
        </div>

        {/* Grupo 3 – Gasto e Uso */}
        <div className="monitoramento-grupo destaque-valores">
          <div>
            <span>Gasto</span>
            <strong>R$ {totalUsado}</strong>
          </div>
          <div>
            <span>Uso</span>
            <strong>{percentualUsado}%</strong>
          </div>
        </div>

        <BarraLimite percentualUsado={percentualUsado} />

        {excedeuLimite && (
          <span className="alerta-limite">⚠ Limite excedido</span>
        )}

      </div>
    </>
  )
}

export default CardMonitoramento