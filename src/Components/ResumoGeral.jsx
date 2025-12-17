import { ArrowBigLeft, BadgeDollarSign, Banknote, Cctv, Trash } from 'lucide-react';
import '../Styles/ResumoGeral.css';
import '../Styles/CardMonitoramento.css';
import { useNavigate } from 'react-router-dom';
import { useCarregarRegistros } from '../Hooks/useCarregarRegistros';
import { useMemo } from 'react';
import { calcularResumoGeral } from '../utils/CalcularResumoGeral';
import { isoToDate } from '../utils/time';
import { useSalvarMonitoramento } from '../Hooks/useSalvarMonitoramento';
import ModalCarregando from '../Components/ModalCarregando';
import { mesPorNumero } from '../utils/mesPorNumero';
import { useCarregarMonitoramento } from '../Hooks/useCarregarMonitoramento';
import { useExcluirMonitoramento } from '../Hooks/useExcluirMonitoramento';
import BarraLimite from './BarraLimite';
import { calcularMonitoramento } from '../utils/calcularMonitoramento';
import CardMonitoramento from './CardMonitoramento';

const ResumoGeral = () => {
  const { carregarRegistros } = useCarregarRegistros();
  const { monitoramentos, carregarMonitoramentos } = useCarregarMonitoramento();
  const { excluindoMonitoramento, excluirMonitoramento } =
    useExcluirMonitoramento({ carregarMonitoramentos });

  const {
    dadosMonitoramento,
    handleMonitoramento,
    salvarMonitoramento,
    salvandoMonitoramento
  } = useSalvarMonitoramento({ carregarMonitoramentos });

  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate('/');
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
      {(salvandoMonitoramento || excluindoMonitoramento) && (
        <ModalCarregando label={salvandoMonitoramento ? 'Salvando' : 'Excluindo'} />
      )}

      <div className="resumo-container">
        <h2 className="resumo-titulo">📊 Resumo Geral</h2>
        <p className="dias-info">
          <strong>Dias registrados:</strong> {diasRegistrados} dias
        </p>

        {/* ================= RESUMO ================= */}
        <div className="resumo-grupo">

          {/* Débitos */}
          <div className="grupo-card debito">
            <h3 className="grupo-titulo"><BadgeDollarSign /> Débitos</h3>
            <div className="info-item"><span>Registros:</span><strong>{debitos.length}</strong></div>
            <div className="info-item"><span>Essencial:</span><strong>R$ {totalDebitoEssencial}</strong></div>
            <div className="info-item"><span>Não-Essencial:</span><strong>R$ {totalDebitoNaoEssencial}</strong></div>
            <div className="info-item total">
              <span><Banknote /> Total:</span>
              <strong>R$ {totalDebitoEssencial + totalDebitoNaoEssencial}</strong>
            </div>
          </div>

          {/* Créditos */}
          <div className="grupo-card credito">
            <h3 className="grupo-titulo"><BadgeDollarSign /> Créditos</h3>
            <div className="info-item"><span>Registros:</span><strong>{creditos.length}</strong></div>
            <div className="info-item"><span>Essencial:</span><strong>R$ {totalCreditoEssencial}</strong></div>
            <div className="info-item"><span>Não-Essencial:</span><strong>R$ {totalCreditoNaoEssencial}</strong></div>
            <div className="info-item total">
              <span><Banknote /> Total:</span>
              <strong>R$ {totalCreditoEssencial + totalCreditoNaoEssencial}</strong>
            </div>
          </div>

          {/* Pix */}
          <div className="grupo-card pix">
            <h3 className="grupo-titulo"><BadgeDollarSign /> Pix</h3>
            <div className="info-item"><span>Registros:</span><strong>{pix.length}</strong></div>
            <div className="info-item"><span>Essencial:</span><strong>R$ {totalPixEssencial}</strong></div>
            <div className="info-item"><span>Não-Essencial:</span><strong>R$ {totalPixNaoEssencial}</strong></div>
            <div className="info-item total">
              <span><Banknote /> Total:</span>
              <strong>R$ {totalPixEssencial + totalPixNaoEssencial}</strong>
            </div>
          </div>
        </div>

        {/* ================= FORM MONITORAMENTO ================= */}
        <div className="form-registro">
          <h3><Cctv /> Monitoramento</h3>

          <label>
            Descrição
            <input type="text" name="descricao" value={dadosMonitoramento.descricao} onChange={handleMonitoramento} />
          </label>

          <label>
            Tipo
            <select name="tipo" value={dadosMonitoramento.tipo} onChange={handleMonitoramento}>
              <option value="credito">Crédito</option>
              <option value="debito">Débito</option>
              <option value="pix">Pix</option>
            </select>
          </label>

          <label>
            Limite
            <input type="number" name="limite" value={dadosMonitoramento.limite} onChange={handleMonitoramento} />
          </label>

          <label>
            Período
            <select name="periodo" value={dadosMonitoramento.periodo} onChange={handleMonitoramento}>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {mesPorNumero(i + 1)}
                </option>
              ))}
            </select>
          </label>

          <label>
            Data
            <input type="date" name="data" value={dadosMonitoramento.data} onChange={handleMonitoramento} />
          </label>

          <button className="btn btn-salvar" onClick={salvarMonitoramento}>Salvar</button>
        </div>

        {/* ================= LISTA MONITORAMENTOS ================= */}
        <h3>Monitoramentos</h3>
        <div className="monitoramento-container">

          {monitoramentos.map((monitoramento, index) => {
            const {
              percentualUsado,
              totalUsado,
              excedeuLimite
            } = calcularMonitoramento(monitoramento, carregarRegistros);

            return (
              <CardMonitoramento
              key={index} 
              monitoramento={monitoramento}
              excluirMonitoramento={excluirMonitoramento}
              percentualUsado={percentualUsado}
              totalUsado={totalUsado}
              excedeuLimite={excedeuLimite}
              />
            );
          })}
        </div>

        <button className="btn btn-editar" onClick={handleVoltar}>
          <ArrowBigLeft /> Voltar
        </button>
      </div>
    </>
  );
};

export default ResumoGeral;
