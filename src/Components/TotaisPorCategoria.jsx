import React from 'react'
import '../Styles/TotaisPorCategoria.css'
import { calcularTotaisPorCategoria } from '../utils/calcularTotaisPorCategoria'
import { useCarregarRegistros } from '../Hooks/useCarregarRegistros'
import { useNavigate } from 'react-router-dom'
import { ArrowBigLeft } from 'lucide-react'

const TotaisPorCategoria = () => {
  const navigate = useNavigate();  
   const handleVoltar = () => {
    navigate('/')
  };

  const { carregarRegistros, loading } = useCarregarRegistros()

  if (loading) {
    return (
      <p className="totais-mensagem">
        ⏳ Carregando dados...
      </p>
    )
  }

  const categorias = calcularTotaisPorCategoria(carregarRegistros)

  if (categorias.length === 0) {
    return (
      <p className="totais-mensagem">
        Nenhuma categoria registrada para exibir os totais.
      </p>
    )
  }

  return (
    <>
    <div className="totais-container">
      <h3 className="totais-titulo">📂 Totais por Categoria</h3>

      {categorias.map(({ categoria, essencial, naoEssencial }) => (
        <div key={categoria} className="totais-card">
          <h4 className="totais-nome">{categoria}</h4>

          <div className="totais-linhas">
            <p><strong>Essencial:</strong> R$ {essencial.toFixed(2)}</p>
            <p><strong>Não Essencial:</strong> R$ {naoEssencial.toFixed(2)}</p>
          </div>
        </div>
      ))}    
      <div className='container'>
        <button className='btn btn-editar' onClick={handleVoltar}><ArrowBigLeft /> Voltar</button>
      </div>  
    
    </div>
    
    </>
  )
}

export default TotaisPorCategoria
