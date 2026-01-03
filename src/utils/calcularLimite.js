export function calcularLimite(objetivo, registros = []) {
  if (!objetivo || !Array.isArray(registros)) {
    return {
      valorGasto: 0,
      limite: 0,
      saldoRestante: 0,
      percentualUsado: 0,
      percentualRestante: 100,
      excedeuLimite: false
    };
  }

  const limite = Number(objetivo.limite) || 0;
  const categoriaObjetivo = objetivo.categoria;
  const gastoObjetivo = objetivo.gasto;
  const tipoObjetivo = objetivo.tipo;

  const dataInicial = objetivo.data;
  const dataFinal = objetivo.dataLimite;

  if (!dataInicial || !dataFinal) {
    return {
      valorGasto: 0,
      limite,
      saldoRestante: limite,
      percentualUsado: 0,
      percentualRestante: 100,
      excedeuLimite: false
    };
  }

  // 🔹 normalização UTC
  const inicioUTC = new Date(dataInicial);
  const fimUTC = new Date(dataFinal);

  const valorGasto = registros
    .filter(registro => {
      if (!registro.data) return false;

      const dataRegistro = new Date(registro.data);

      return (
        registro.categoria === categoriaObjetivo &&
        registro.gasto === gastoObjetivo &&
        registro.tipo === tipoObjetivo &&
        dataRegistro.getTime() >= inicioUTC.getTime() &&
        dataRegistro.getTime() <= fimUTC.getTime()
      );
    })
    .reduce((total, registro) => {
      return total + (Number(registro.valor) || 0);
    }, 0);

  const saldoRestante = limite - valorGasto;

  const percentualUsado = limite > 0
    ? (valorGasto / limite) * 100
    : 0;

  const percentualRestante = 100 - percentualUsado;

  return {
    valorGasto,
    limite,
    saldoRestante,
    percentualUsado: Number(percentualUsado.toFixed(2)),
    percentualRestante: Number(percentualRestante.toFixed(2)),
    excedeuLimite: valorGasto > limite
  };
}
