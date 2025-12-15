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

  // Soma apenas registros da mesma categoria
  const valorGasto = registros
    .filter(registro => registro.categoria === categoriaObjetivo)
    .reduce((total, registro) => total + Number(registro.valor || 0), 0);

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
