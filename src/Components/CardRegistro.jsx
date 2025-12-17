import { AlertCircle, ArrowDownUp, Calendar, DollarSign, FileText, Tag } from 'lucide-react'
import React from 'react'

const CardRegistro = ({ registro, excluirRegistro }) => {
    return (
        <>
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
        </>
    )
}

export default CardRegistro