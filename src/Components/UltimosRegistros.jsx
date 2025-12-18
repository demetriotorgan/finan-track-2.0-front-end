import React, { useEffect, useState } from 'react'
import Carregando from './Carregando';
import '../Styles/RegistroContainer.css'
import { Calendar, DollarSign, FileText, Tag, ArrowDownUp, AlertCircle, Pencil } from 'lucide-react';
import { useCarregarRegistros } from '../Hooks/useCarregarRegistros';
import ModalCarregando from '../Components/ModalCarregando';
import { useExcluirRegistro } from '../Hooks/useExcluirRegistro';
import CardRegistro from './CardRegistro';

const UltimosRegistros = () => {
    const { carregarRegistros, carregarUltimosRegistros } = useCarregarRegistros();
    const { excluindo, excluirRegistro } = useExcluirRegistro({ carregarUltimosRegistros });

    return (
        <>
            <h3><Pencil />Últimos Lançamentos</h3>
            {excluindo && <ModalCarregando />}            
            <div className='registros-container'>
                {carregarRegistros.slice(0, 3).map((registro) => (
                    <div key={registro._id} className="registro-card">
                        <CardRegistro
                            registro={registro}
                            excluirRegistro={excluirRegistro} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default UltimosRegistros