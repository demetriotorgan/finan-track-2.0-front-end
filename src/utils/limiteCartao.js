// utils/limiteCartao.js
export function limiteCartao(registros = [], cartao = {}) {

  const limite = Number(cartao.limite) || 0;
  const valorInicial = Number(cartao.valorInicial) || 0;

  const dataInicial = cartao.data;
  const dataFinal = cartao.dataLimite;

  if (
    !Array.isArray(registros) ||
    !limite ||
    !dataInicial ||
    !dataFinal
  ) {
    return {
      totalUsado: valorInicial,
      saldoDisponivel: limite - valorInicial,
      percentualUsado: limite > 0 ? (valorInicial / limite) * 100 : 0,
      percentualDisponivel: 100
    };
  }

  // 🔹 normaliza tudo para UTC
  const inicioUTC = new Date(dataInicial);
  const fimUTC = new Date(dataFinal);

  const totalCreditosNoPeriodo = registros
    .filter(r => {
      if (r.tipo !== 'credito' || !r.data) return false;

      const dataRegistro = new Date(r.data);

      return (
        dataRegistro.getTime() >= inicioUTC.getTime() &&
        dataRegistro.getTime() <= fimUTC.getTime()
      );
    })
    .reduce((acc, r) => acc + (Number(r.valor) || 0), 0);

  const totalUsado = valorInicial + totalCreditosNoPeriodo;
  const saldoDisponivel = limite - totalUsado;

  const percentualUsado = limite > 0
    ? (totalUsado / limite) * 100
    : 0;

  const percentualDisponivel = 100 - percentualUsado;

  return {
    totalUsado,
    saldoDisponivel,
    percentualUsado,
    percentualDisponivel
  };
}
