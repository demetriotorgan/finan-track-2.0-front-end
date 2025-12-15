import React, { useEffect, useState } from 'react'
import api from '../api/api';
import { isoToDate } from '../utils/time';
import '../Styles/CardObjetivo.css'
import { usecarregarObjetivo } from '../Hooks/useCarregarObjetivo';
import { formatarMoedaBR } from '../utils/formatarMoeda';

const CardObjetivo = () => {
   const {objetivos} = usecarregarObjetivo();

    return (
        <div className='container'>
            {objetivos.map((objetivo, index) => (
                <div key={index} className='card-objetivo'>
                    <h3>Objetivo: {objetivo.descricao}</h3>
                    <p><strong>Limite:</strong> {formatarMoedaBR(objetivo.limite)}</p>
                    <p><strong>Categoria:</strong> {objetivo.categoria}</p>
                    <p><strong>Período:</strong> {objetivo.periodo}</p>
                    <p><strong>Data:</strong> {isoToDate(objetivo.data)}</p>
                </div>
            ))}
        </div>
    )
}

export default CardObjetivo