import React, { useState, useMemo } from 'react'
import '../Styles/TotaisPorCategoria.css'
import { calcularTotaisPorCategoria } from '../utils/calcularTotaisPorCategoria'
import { useCarregarRegistros } from '../Hooks/useCarregarRegistros'
import { useNavigate } from 'react-router-dom'
import { ArrowBigLeft } from 'lucide-react'
import { mesPorNumero } from '../utils/mesPorNumero'

const TotaisPorCategoria = () => {
  const navigate = useNavigate()
  const { carregarRegistros, loading } = useCarregarRegistros()

  const [mesSelecionado, setMesSelecionado] = useState(null)

  const handleVoltar = () => navigate('/')

  // 🔹 gera meses únicos disponíveis
  const mesesDisponiveis = useMemo(() => {
    const mapa = new Map()

    carregarRegistros.forEach((r) => {
      if (!r.data) return
      const data = new Date(r.data)
      const mes = data.getMonth() + 1
      const ano = data.getFullYear()
      const chave = `${ano}-${mes}`

      if (!mapa.has(chave)) {
        mapa.set(chave, { mes, ano })
      }
    })

    return Array.from(mapa.values()).sort((a, b) => {
      const d1 = new Date(a.ano, a.mes - 1)
      const d2 = new Date(b.ano, b.mes - 1)
      return d2 - d1
    })
  }, [carregarRegistros])

  const categorias = calcularTotaisPorCategoria(
    carregarRegistros,
    mesSelecionado
  )

  if (loading) {
    return <p className="totais-mensagem">⏳ Carregando dados...</p>
  }

  if (categorias.length === 0) {
    return (
      <p className="totais-mensagem">
        Nenhuma categoria para o período selecionado.
      </p>
    )
  }

  return (
    <div className="totais-container">
      <h3 className="totais-titulo">📂 Totais por Categoria</h3>

      {/* 🔽 SELECT DE MÊS */}
      <p className="totais-label">Filtrar por mês</p>
      <select
        className="totais-select"
        onChange={(e) => {
          const [ano, mes] = e.target.value.split('-')
          setMesSelecionado({ mes: Number(mes), ano: Number(ano) })
        }}
      >
        <option value="">Selecione um mês</option>
        {mesesDisponiveis.map(({ mes, ano }) => (
          <option key={`${ano}-${mes}`} value={`${ano}-${mes}`}>
            {mesPorNumero(mes)} / {ano}
          </option>
        ))}
      </select>

      {categorias.map(({ categoria, essencial, naoEssencial }) => (
        <div key={categoria} className="totais-card">
          <h4 className="totais-nome">{categoria}</h4>

          <div className="totais-linhas">
            <p><strong>Essencial:</strong> R$ {essencial.toFixed(2)}</p>
            <p><strong>Não Essencial:</strong> R$ {naoEssencial.toFixed(2)}</p>
          </div>
        </div>
      ))}

      <div className="container">
        <button className="btn btn-editar" onClick={handleVoltar}>
          <ArrowBigLeft /> Voltar
        </button>
      </div>
    </div>
  )
}

export default TotaisPorCategoria
