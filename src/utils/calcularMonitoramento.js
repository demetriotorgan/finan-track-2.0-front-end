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
  const periodoMonitoramento = Number(monitoramento.periodo); // 1–12

  const totalUsado = registros
    .filter(registro => {
      if (!registro.data) return false;

      const mesRegistro = new Date(registro.data).getMonth() + 1;

      return (
        registro.tipo === tipoMonitoramento &&
        mesRegistro === periodoMonitoramento
      );
    })
    .reduce((total, registro) => total + Number(registro.valor || 0), 0);

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
