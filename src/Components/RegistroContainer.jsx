import '../Styles/RegistroContainer.css'

const RegistroContainer = ({ registros, loadingList, excluirRegistro }) => {
  return (
    <div className="registros-container">
      {loadingList ? (
        <div className="registros-loading">
          <div className="small-spinner"></div>
          <span>Carregando registros...</span>
        </div>
      ) : (
        registros.map((registro) => (
          <div key={registro._id} className="registro-card">

            {/* Data pequena */}
            <span className="registro-data">
              {new Date(registro.data).toLocaleDateString()}
            </span>

            {/* Valor em destaque */}
            <div className="registro-valor">
              R$ {registro.valor.toFixed(2)}
            </div>

            {/* Categoria */}
            <div className="registro-categoria">
              <span className="badge categoria">
                {registro.categoria}
              </span>
            </div>

            {/* Tipo e Natureza */}
            <div className="registro-tags">
              <span className={`badge tipo ${registro.tipo}`}>
                {registro.tipo}
              </span>

              <span className={`badge gasto ${registro.gasto}`}>
                {registro.gasto === 'essencial'
                  ? 'Essencial'
                  : 'Não Essencial'}
              </span>
            </div>

            {/* Botão excluir */}
            <button
              className="btn btn-excluir registro-excluir"
              onClick={() => excluirRegistro(registro._id)}
            >
              🗑️ Excluir
            </button>

          </div>
        ))
      )}
    </div>
  );
};

export default RegistroContainer;
