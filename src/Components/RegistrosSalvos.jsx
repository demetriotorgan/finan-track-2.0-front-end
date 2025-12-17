import React from 'react'
import { useCarregarRegistros } from '../Hooks/useCarregarRegistros'
import Carregando from './Carregando';
import { Calendar, DollarSign, FileText, Tag, ArrowDownUp, AlertCircle, Pencil, HandCoins, ArrowBigLeft } from 'lucide-react';
import { useExcluirRegistro } from '../Hooks/useExcluirRegistro';
import ModalCarregando from '../Components/ModalCarregando';
import { useNavigate } from 'react-router-dom';
import CardRegistro from './CardRegistro';

const RegistrosSalvos = () => {
  const { carregarRegistros, loading, carregarUltimosRegistros } = useCarregarRegistros();
  const { excluindo, excluirRegistro } = useExcluirRegistro({ carregarUltimosRegistros });
   const navigate = useNavigate();  
   const handleVoltar = () => {
    navigate('/')
  }

  return (
    <div className='container'>      
      <h3><HandCoins /> Todos os Lançamentos</h3>
      <button className='btn btn-editar' onClick={handleVoltar}><ArrowBigLeft /> Voltar</button>

      {excluindo && <ModalCarregando label='Exclundo' />}
      {loading && <Carregando label='Carregando...' />}

      <div className='registros-container'>
        {carregarRegistros.map((registro) => (
          <div key={registro._id} className="registro-card">
            <CardRegistro 
            registro={registro}
            excluirRegistro={excluirRegistro}/>            
          </div>
        ))}        
      </div>      
    </div>
  )
}

export default RegistrosSalvos