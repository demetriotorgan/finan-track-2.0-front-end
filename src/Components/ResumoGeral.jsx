import { ArrowBigLeft, BadgeDollarSign, Banknote, Cctv, Trash } from 'lucide-react';
import '../Styles/ResumoGeral.css'
import '../Styles/CardMonitoramento.css'
import { useNavigate } from 'react-router-dom';
import { useCarregarRegistros } from '../Hooks/useCarregarRegistros';
import { useEffect, useMemo, useState } from 'react';
import { calcularResumoGeral } from '../utils/CalcularResumoGeral';
import { dateToIso, isoToDate, isoToDateEdit } from '../utils/time';
import api from '../api/api';
import { useSalvarMonitoramento } from '../Hooks/useSalvarMonitoramento';
import ModalCarregando from '../Components/ModalCarregando'
import { mesPorNumero } from '../utils/mesPorNumero';
import { useCarregarMonitoramento } from '../Hooks/useCarregarMonitoramento';
import { useExcluirMonitoramento } from '../Hooks/useExcluirMonitoramento';

const ResumoGeral = () => {
  const { carregarRegistros, loading, carregarUltimosRegistros } = useCarregarRegistros();
  const { monitoramentos, carregarMonitoramentos} = useCarregarMonitoramento();
  const {excluindoMonitoramento, excluirMonitoramento} = useExcluirMonitoramento({carregarMonitoramentos});
  const { dadosMonitoramento, handleMonitoramento, salvarMonitoramento, salvandoMonitoramento } = useSalvarMonitoramento({carregarMonitoramentos});
  
 
  const navigate = useNavigate();
  const handleVoltar = () => {
    navigate('/')
  };

  const resumo = useMemo(() => {
    return calcularResumoGeral(carregarRegistros);
  }, [carregarRegistros]);

  const {
    debitos,
    creditos,
    totalDebitoEssencial,
    totalDebitoNaoEssencial,
    totalCreditoEssencial,
    totalCreditoNaoEssencial,
    diasRegistrados,
    pix,
    totalPixEssencial,
    totalPixNaoEssencial
  } = resumo;

  return (
    <>
      {(salvandoMonitoramento || excluindoMonitoramento)  && <ModalCarregando label={salvandoMonitoramento ? 'Salvando' : 'Excluindo'} />}
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

          {/* Grupo pix */}
          <div className="grupo-card pix">
            <h3 className="grupo-titulo"><BadgeDollarSign /> Pix</h3>

            <div className="info-item">
              <span>Registros:</span>
              <strong>{pix.length}</strong>
            </div>

            <div className="info-item">
              <span>Essencial:</span>
              <strong>R$ {totalPixEssencial} </strong>
            </div>

            <div className="info-item">
              <span>Não-Essencial:</span>
              <strong>R$ {totalPixNaoEssencial} </strong>
            </div>

            <div className="info-item total">
              <span><Banknote /> Total:</span>
              <strong>R$ {totalPixEssencial + totalPixNaoEssencial} </strong>
            </div>
          </div>
        </div>

        <button
          // onClick={() => exportarParaCSV(registros)}
          className="btn-download"
        >
          📥 Baixar Tabela CSV
        </button>
        <div className='form-registro'>
          <h3><Cctv /> Monitoramento</h3>
          <label>
            Descrição
            <input
              type='text'
              name='descricao'
              value={dadosMonitoramento.descricao}
              onChange={handleMonitoramento}
            />
          </label>
          <label>
            Tipo
            <select name='tipo' value={dadosMonitoramento.tipo} onChange={handleMonitoramento}>
              <option value="credito">Crédito</option>
              <option value="debito">Débito</option>
              <option value="pix">Pix</option>
            </select>
          </label>
          <label>
            Limite
            <input
              type='number'
              name='limite'
              value={dadosMonitoramento.limite}
              onChange={handleMonitoramento}
            />
          </label>
          <label>
            Período
            <select name='periodo' value={dadosMonitoramento.periodo} onChange={handleMonitoramento}>
              <option value="1">Janeiro</option>
              <option value="2">Feveiro</option>
              <option value="3">Março</option>
              <option value="4">Abril</option>
              <option value="5">Maio</option>
              <option value="6">Junho</option>
              <option value="7">Julho</option>
              <option value="8">Agosto</option>
              <option value="9">Setembro</option>
              <option value="10">Outubro</option>
              <option value="11">Novembro</option>
              <option value="12">Dezembro</option>
            </select>
          </label>
          <label>
            Data
            <input
              type='date'
              name='data'
              value={dadosMonitoramento.data}
              onChange={handleMonitoramento}
            />
          </label>
          <button className='btn btn-salvar' onClick={salvarMonitoramento}>Salvar</button>
        </div>
        <h3>Monitoramentos</h3>
        <div className="monitoramento-container">
          {monitoramentos.map((monitoramento, index) => (
            <div key={index} className='card-monitoramento'>
              <p><strong>Monitoramento:</strong> {monitoramento.descricao}</p>
              <p><strong>Tipo:</strong> {monitoramento.tipo}</p>
              <p><strong>Limite:</strong> {monitoramento.limite}</p>
              <p><strong>Período:</strong> {mesPorNumero(monitoramento.periodo)}</p>
              <p><strong>Data:</strong> {isoToDate(monitoramento.data)}</p>
              <button className='btn-trash' onClick={()=>excluirMonitoramento(monitoramento._id)}><Trash /></button>
            </div>
          ))}          
        </div>
        <button className='btn btn-editar' onClick={handleVoltar}><ArrowBigLeft /> Voltar</button>
      </div>
    </>
  );
};

export default ResumoGeral;
