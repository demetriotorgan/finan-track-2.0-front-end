import React from 'react'
import '../Styles/TotaisPorCategoria.css'

const TotaisPorCategoria = () => {
  const registrosComCategoria = registros.filter(r => r.categoria && r.categoria.trim() !== '');

  const totaisPorCategoria = registrosComCategoria.reduce((acc, registro) => {
    const { categoria, gasto, valor } = registro;

    if (!acc[categoria]) {
      acc[categoria] = { essencial: 0, 'nao-essencial': 0 };
    }

    if (gasto === 'essencial' || gasto === 'nao-essencial') {
      acc[categoria][gasto] += valor;
    }

    return acc;
  }, {});

  const categorias = Object.entries(totaisPorCategoria);

  if (categorias.length === 0) {
    return <p className="totais-mensagem">Nenhuma categoria registrada para exibir os totais.</p>;
  }

  return (
    <div className="totais-container">
      <h3 className="totais-titulo">📂 Totais por Categoria</h3>

      {categorias.map(([categoria, valores]) => (
        <div key={categoria} className="totais-card">
          <h4 className="totais-nome">{categoria}</h4>

          <div className="totais-linhas">
            <p><strong>Essencial:</strong> R$ {valores.essencial.toFixed(2)}</p>
            <p><strong>Não Essencial:</strong> R$ {valores['nao-essencial'].toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TotaisPorCategoria