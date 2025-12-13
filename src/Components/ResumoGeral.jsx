import { ArrowBigLeft, BadgeDollarSign, Banknote } from 'lucide-react';
import '../Styles/ResumoGeral.css'
import { useNavigate } from 'react-router-dom';
import { useCarregarRegistros } from '../Hooks/useCarregarRegistros';
import { useMemo } from 'react';
import { calcularResumoGeral } from '../utils/CalcularResumoGeral';

const ResumoGeral = () => {
  const {carregarRegistros, loading, carregarUltimosRegistros} = useCarregarRegistros();
  const navigate = useNavigate();  
   const handleVoltar = () => {
    navigate('/')
  };

  const resumo = useMemo(()=>{
    return calcularResumoGeral(carregarRegistros);
  }, [carregarRegistros]);

  const {
    debitos,
    creditos,
    totalDebitoEssencial,
    totalDebitoNaoEssencial,
    totalCreditoEssencial,
    totalCreditoNaoEssencial,
    diasRegistrados
  } = resumo;  

  return (
    <div className="resumo-container">
      <h2 className="resumo-titulo">📊 Resumo Geral</h2>
      <p className="dias-info"><strong>Dias registrados:</strong> {diasRegistrados} dias</p>

      <div className="resumo-grupo">

        {/* Grupo Débitos */}
        <div className="grupo-card debito">
          <h3 className="grupo-titulo"><BadgeDollarSign /> Débitos</h3>

          <div className="info-item">
            <span>Registros:</span>
            <strong>{debitos.length}</strong>
          </div>

          <div className="info-item">
            <span>Essencial:</span>
            <strong>R$ {totalDebitoEssencial}</strong>
          </div>

          <div className="info-item">
            <span>Não-Essencial:</span>
            <strong>R$ {totalDebitoNaoEssencial}</strong>
          </div>

          <div className="info-item total">
            <span><Banknote /> Total:</span>
            <strong>R$ {totalDebitoEssencial + totalDebitoNaoEssencial}</strong>
          </div>
        </div>

        {/* Grupo Créditos */}
        <div className="grupo-card credito">
          <h3 className="grupo-titulo"><BadgeDollarSign /> Créditos</h3>

          <div className="info-item">
            <span>Registros:</span>
            <strong>{creditos.length}</strong>
          </div>

          <div className="info-item">
            <span>Essencial:</span>
            <strong>R$ {totalCreditoEssencial} </strong>
          </div>

          <div className="info-item">
            <span>Não-Essencial:</span>
            <strong>R$ {totalCreditoNaoEssencial} </strong>
          </div>

          <div className="info-item total">
            <span><Banknote /> Total:</span>
            <strong>R$ {totalCreditoEssencial + totalCreditoNaoEssencial} </strong>
          </div>
        </div>
      </div>

      <button
        // onClick={() => exportarParaCSV(registros)}
        className="btn-download"
      >
        📥 Baixar Tabela CSV
      </button>      
      <button className='btn btn-editar' onClick={handleVoltar}><ArrowBigLeft /> Voltar</button>
    </div>
    
  );
};

export default ResumoGeral;
