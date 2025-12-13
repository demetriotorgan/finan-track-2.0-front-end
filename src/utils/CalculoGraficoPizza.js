export function calcularTotaisPorTipo(registros = [], tipo) {
  if (!Array.isArray(registros) || !tipo) return []

  const totais = { essencial: 0, 'nao-essencial': 0 }

  registros.forEach((reg) => {
    if (reg.tipo === tipo && totais.hasOwnProperty(reg.gasto)) {
      totais[reg.gasto] += Number(reg.valor) || 0
    }
  })

  // 🔑 Se tudo for zero, não retorna dados
  const temValores = Object.values(totais).some(v => v > 0)
  if (!temValores) return []

  return [
    { name: 'Essencial', value: totais.essencial },
    { name: 'Não Essencial', value: totais['nao-essencial'] }
  ]
}
