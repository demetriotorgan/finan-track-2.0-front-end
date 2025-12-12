import '../Styles/ResumoGeral.css'

const ResumoGeral = ({
  diasRegistrados,
  debitos,
  totalDebitoEssencial,
  totalDebitoNaoEssencial,
  creditos,
  totalCreditoEssencial,
  totalCreditoNaoEssencial
}) => {
  return (
    <div className="resumo-container">

      <h2 className="resumo-titulo">📊 Resumo Geral</h2>
      <p className="dias-info"><strong>Dias registrados:</strong> {diasRegistrados} dias</p>

      <div className="resumo-grupo">
        {/* Grupo Débitos */}
        <div className="grupo-card debito">
          <h3 className="grupo-titulo">Débitos</h3>

          <div className="info-item">
            <span>Registros:</span>
            <strong>{debitos.length}</strong>
          </div>

          <div className="info-item">
            <span>Essencial:</span>
            <strong>R$ {totalDebitoEssencial.toFixed(2)}</strong>
          </div>

          <div className="info-item">
            <span>Não-Essencial:</span>
            <strong>R$ {totalDebitoNaoEssencial.toFixed(2)}</strong>
          </div>

          <div className="info-item total">
            <span>Total:</span>
            <strong>R$ {(totalDebitoEssencial + totalDebitoNaoEssencial).toFixed(2)}</strong>
          </div>
        </div>

        {/* Grupo Créditos */}
        <div className="grupo-card credito">
          <h3 className="grupo-titulo">Créditos</h3>

          <div className="info-item">
            <span>Registros:</span>
            <strong>{creditos.length}</strong>
          </div>

          <div className="info-item">
            <span>Essencial:</span>
            <strong>R$ {totalCreditoEssencial.toFixed(2)}</strong>
          </div>

          <div className="info-item">
            <span>Não-Essencial:</span>
            <strong>R$ {totalCreditoNaoEssencial.toFixed(2)}</strong>
          </div>

          <div className="info-item total">
            <span>Total:</span>
            <strong>R$ {(totalCreditoEssencial + totalCreditoNaoEssencial).toFixed(2)}</strong>
          </div>
        </div>
      </div>

      <button
        onClick={() => exportarParaCSV(registros)}
        className="btn-download"
      >
        📥 Baixar Tabela CSV
      </button>
    </div>
  );
};

export default ResumoGeral;
