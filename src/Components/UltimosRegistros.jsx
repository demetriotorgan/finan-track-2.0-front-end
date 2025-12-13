import React, { useEffect, useState } from 'react'
import api from '../api/api'
import Carregando from './Carregando';
import '../Styles/RegistroContainer.css'
import { Calendar, DollarSign, FileText, Tag, ArrowDownUp, AlertCircle, Pencil } from 'lucide-react';
import { useCarregarUltimosRegistros } from '../Hooks/useCarregarUltimosRegistros';
import ModalCarregando from '../Components/ModalCarregando';
import { useExcluirRegistro } from '../Hooks/useExcluirRegistro';

const UltimosRegistros = () => {
    const { carregarRegistros, loading, carregarUltimosRegistros } = useCarregarUltimosRegistros();
    const { excluindo, excluirRegistro } = useExcluirRegistro({ carregarUltimosRegistros });

    return (
        <>
            <h3><Pencil />Últimos Lançamentos</h3>
            {excluindo && <ModalCarregando />}
            {loading && <Carregando label='Carregando...' />}
            <div className='registros-container'>
                {carregarRegistros.slice(0, 3).map((registro) => (
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
        </>
    )
}

export default UltimosRegistros