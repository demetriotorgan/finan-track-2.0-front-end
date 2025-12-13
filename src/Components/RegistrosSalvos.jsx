import React from 'react'
import { useCarregarRegistros } from '../Hooks/useCarregarRegistros'
import Carregando from './Carregando';
import { Calendar, DollarSign, FileText, Tag, ArrowDownUp, AlertCircle, Pencil, HandCoins } from 'lucide-react';
import { useExcluirRegistro } from '../Hooks/useExcluirRegistro';
import ModalCarregando from '../Components/ModalCarregando';

const RegistrosSalvos = () => {
  const { carregarRegistros, loading, carregarUltimosRegistros } = useCarregarRegistros();
  const { excluindo, excluirRegistro } = useExcluirRegistro({ carregarUltimosRegistros })

  return (
    <div className='container'>
      <h3><HandCoins /> Todos os Lançamentos</h3>
      {excluindo && <ModalCarregando label='Exclundo' />}
      {loading && <Carregando label='Carregando...' />}

      <div className='registros-container'>
        {carregarRegistros.map((registro) => (
          <div key={registro._id} className="registro-card">

            {/* Data */}
            <span className="registro-data">
              <Calendar size={14} />
              {new Date(registro.data).toLocaleDateString()}
            </span>

            {/* Valor */}
            <div className="registro-valor">
              <DollarSign size={18} />
              R$ {registro.valor.toFixed(2)}
            </div>

            {/* Descrição */}
            <div className="registro-descricao">
              <FileText size={16} />
              {registro.descricao}
            </div>

            {/* Categoria */}
            <div className="registro-categoria">
              <span className="badge categoria">
                <Tag size={14} />
                {registro.categoria}
              </span>
            </div>

            {/* Tipo e Natureza */}
            <div className="registro-tags">
              <span className={`badge tipo ${registro.tipo}`}>
                <ArrowDownUp size={14} />
                {registro.tipo}
              </span>

              <span className={`badge gasto ${registro.gasto}`}>
                <AlertCircle size={14} />
                {registro.gasto === 'essencial'
                  ? 'Essencial'
                  : 'Não Essencial'}
              </span>
            </div>

            {/* Botão excluir */}
            <button
              className="btn btn-excluir registro-excluir"
              onClick={() => excluirRegistro(registro)}>
              🗑️ Excluir
            </button>

          </div>
        ))}
      </div>
    </div>
  )
}

export default RegistrosSalvos