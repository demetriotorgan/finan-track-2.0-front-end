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
import { ArrowBigLeft } from 'lucide-react';

const CardObjetivo = () => {
    const navigate = useNavigate();
    const handleVoltar = () => {
        navigate('/')
    }
    const { objetivos, loading } = usecarregarObjetivo();
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
                            <h3>{objetivo.descricao}</h3>
                            <p><strong>Categoria:</strong> {objetivo.categoria}</p>
                            <p><strong>Limite:</strong> {formatarMoedaBR(limite)}</p>
                            <p><strong>Gasto:</strong> {formatarMoedaBR(valorGasto)}</p>
                            <p><strong>Uso:</strong> {percentualUsado}%</p>

                            {excedeuLimite && (
                                <span className="alerta-limite">Limite excedido</span>
                            )}
                        </div>
                    );
                })}
                <button type='button' className='btn btn-editar' onClick={handleVoltar}><ArrowBigLeft />Voltar</button>
            </div>
        </>
    )
}

export default CardObjetivo