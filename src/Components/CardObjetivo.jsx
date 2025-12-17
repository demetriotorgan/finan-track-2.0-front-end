import React, { useEffect, useState } from 'react'
import api from '../api/api';
import { isoToDate } from '../utils/time';
import '../Styles/CardObjetivo.css'
import { usecarregarObjetivo } from '../Hooks/useCarregarObjetivo';
import { formatarMoedaBR } from '../utils/formatarMoeda';
import Carregando from '../Components/Carregando'
import { useCarregarRegistros } from '../Hooks/useCarregarRegistros';
import { calcularLimite } from '../utils/calcularLimite';
import { useNavigate } from 'react-router-dom';
import { ArrowBigLeft, Trash2 } from 'lucide-react';
import BarraLimite from './BarraLimite';
import { mesPorNumero } from '../utils/mesPorNumero'

const CardObjetivo = ({ objetivos, loading, excluirObjetivo }) => {    
    const { carregarRegistros } = useCarregarRegistros();

    return (
        <>
            <div className='container'>
                {loading && <Carregando />}
                {objetivos.map(objetivo => {
                    const {
                        valorGasto,
                        limite,
                        percentualUsado,
                        excedeuLimite
                    } = calcularLimite(objetivo, carregarRegistros);

                    return (
                        <div key={objetivo._id} className="card-objetivo">
                            <h3>
                                <button
                                    className="btn-excluir"
                                    onClick={() => excluirObjetivo(objetivo._id)}
                                >
                                    <Trash2 />
                                </button>
                                {objetivo.descricao}
                            </h3>

                            {/* Grupo 1 */}
                            <div className="grupo-info">
                                <div>
                                    <span>Categoria</span>
                                    <strong>{objetivo.categoria}</strong>
                                </div>
                                <div>
                                    <span>Gastos</span>
                                    <strong>{objetivo.gasto}</strong>
                                </div>
                            </div>

                            {/* Grupo 2 */}
                            <div className="grupo-info">
                                <div>
                                    <span>Período</span>
                                    <strong>{mesPorNumero(objetivo.periodo)}</strong>
                                </div>
                                <div>
                                    <span>Tipo de Pag.</span>
                                    <strong>{objetivo.tipo}</strong>
                                </div>
                            </div>

                            {/* Grupo 3 */}
                            <div className="grupo-info destaque-valores">
                                <div>
                                    <span>Valor Total</span>
                                    <strong>{formatarMoedaBR(valorGasto)}</strong>
                                </div>
                                <div>
                                    <span>Limite</span>
                                    <strong>{formatarMoedaBR(limite)}</strong>
                                </div>
                            </div>

                            {/* Uso */}
                            <div className="uso-container">
                                <span>Uso do limite</span>
                                <strong>{percentualUsado}%</strong>
                            </div>

                            <BarraLimite percentualUsado={percentualUsado} />

                            {excedeuLimite && (
                                <span className="alerta-limite">⚠ Limite excedido</span>
                            )}
                        </div>
                    );
                })}                
            </div>
        </>
    )
}

export default CardObjetivo