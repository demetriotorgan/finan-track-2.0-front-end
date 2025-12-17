import React, { useMemo } from 'react'
import '../Styles/SecaoPorMes.css'
import { useCarregarRegistros } from '../Hooks/useCarregarRegistros'
import Carregando from './Carregando';
import { Calendar, DollarSign, FileText, Tag, ArrowDownUp, AlertCircle, Pencil, HandCoins, ArrowBigLeft } from 'lucide-react';
import { useExcluirRegistro } from '../Hooks/useExcluirRegistro';
import ModalCarregando from '../Components/ModalCarregando';
import { useNavigate } from 'react-router-dom';
import CardRegistro from './CardRegistro';
import { agruparRegistrosPorMes } from '../utils/agruparRegistrosPorMes';

const RegistrosSalvos = () => {
  const { carregarRegistros, loading, carregarUltimosRegistros } = useCarregarRegistros();
  // console.log('📥 Registros ORIGINAIS (carregarRegistros):', carregarRegistros);

  const { excluindo, excluirRegistro } = useExcluirRegistro({ carregarUltimosRegistros });
  const navigate = useNavigate();
  const handleVoltar = () => {
    navigate('/')
  };

const registrosPorMes = useMemo(() => {
  const agrupado = agruparRegistrosPorMes(carregarRegistros);
  // console.log('📦 Registros AGRUPADOS por mês:', agrupado);
  return agrupado;
}, [carregarRegistros]);

  return (
    <div className='container'>
      <h3><HandCoins /> Todos os Lançamentos</h3>
      <button className='btn btn-editar' onClick={handleVoltar}><ArrowBigLeft /> Voltar</button>

      {excluindo && <ModalCarregando label='Exclundo' />}
      {loading && <Carregando label='Carregando...' />}

      <div className="registros-container">

        {registrosPorMes.map((grupo) => {
  // console.log(`🗂️ Grupo renderizado: ${grupo.titulo}`, grupo.registros);

  return (
    <section key={`${grupo.ano}-${grupo.mes}`} className="secao-mes">
      <h4 className="titulo-mes">
        {grupo.titulo}
      </h4>

      <div className="lista-registros-mes">
        {grupo.registros.map((registro) => {
          // console.log(
          //   `📄 Registro renderizado (${grupo.titulo}):`,
          //   registro._id,
          //   registro.data
          // );

          return (
            <div key={registro._id} className="registro-card">
              <CardRegistro
                registro={registro}
                excluirRegistro={excluirRegistro}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
})}


      </div>

    </div>
  )
}

export default RegistrosSalvos