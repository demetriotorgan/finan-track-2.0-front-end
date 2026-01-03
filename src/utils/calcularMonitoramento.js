export function calcularMonitoramento(monitoramento, registros = []) {
  if (!monitoramento || !Array.isArray(registros)) {
    return {
      totalUsado: 0,
      limite: 0,
      percentualUsado: 0,
      excedeuLimite: false
    };
  }

  const limite = Number(monitoramento.limite) || 0;
  const tipoMonitoramento = monitoramento.tipo;

  const dataInicial = monitoramento.data;
  const dataFinal = monitoramento.dataLimite;

  if (!dataInicial || !dataFinal) {
    return {
      totalUsado: 0,
      limite,
      percentualUsado: 0,
      excedeuLimite: false
    };
  }

  // 🔹 normalização UTC
  const inicioUTC = new Date(dataInicial);
  const fimUTC = new Date(dataFinal);

  const totalUsado = registros
    .filter(registro => {
      if (!registro.data) return false;
      if (registro.tipo !== tipoMonitoramento) return false;

      const dataRegistro = new Date(registro.data);

      return (
        dataRegistro.getTime() >= inicioUTC.getTime() &&
        dataRegistro.getTime() <= fimUTC.getTime()
      );
    })
    .reduce((total, registro) => {
      return total + (Number(registro.valor) || 0);
    }, 0);

  const percentualUsado = limite > 0
    ? (totalUsado / limite) * 100
    : 0;

  return {
    totalUsado,
    limite,
    percentualUsado: Number(percentualUsado.toFixed(2)),
    excedeuLimite: totalUsado > limite
  };
}
