// utils/limiteCartao.js
export function limiteCartao(registros = [], cartao = {}) {
  //  console.log('🔴 CARTÃO NA FUNÇÃO:', cartao);

  const limite = Number(cartao.limite) || 0;
  const valorInicial = Number(cartao.valorInicial) || 0;
  //  console.log('🟠 VALORES NORMALIZADOS:', {
  //   limite,
  //   valorInicial
  // });
  const dataCartao = cartao.data;

  if (!Array.isArray(registros) || !limite || !dataCartao) {
    return {
      totalUsado: valorInicial,
      saldoDisponivel: limite - valorInicial,
      percentualUsado: limite > 0 ? (valorInicial / limite) * 100 : 0,
      percentualDisponivel: 100
    };
  }

  const dataInicialCartao = new Date(dataCartao);

  // 1. Soma créditos após a data do cartão
  const totalCreditosAposCartao = registros
    .filter(r =>
      r.tipo === 'credito' &&
      new Date(r.data) >= dataInicialCartao
    )
    .reduce((acc, r) => acc + (Number(r.valor) || 0), 0);
  
    // console.log('🧮 TOTAL CRÉDITOS APÓS CARTÃO:', totalCreditosAposCartao);
  // 2. Total usado REAL
  const totalUsado = valorInicial + totalCreditosAposCartao;

//   console.log('🟢 TOTAL USADO FINAL:', {
//   valorInicial,
//   totalCreditosAposCartao,
//   totalUsado
// });
  // 3. Saldo disponível (pode ser negativo)
  const saldoDisponivel = limite - totalUsado;

  // 4. Percentual usado (PODE passar de 100%)
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
