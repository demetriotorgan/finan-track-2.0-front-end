// utils/limiteCartao.js

export function limiteCartao(registros = [], limite = 0) {
  if (!Array.isArray(registros) || !limite) {
    return {
      totalUsado: 0,
      saldoDisponivel: limite,
      percentualUsado: 0
    };
  }

  // 1. Filtra apenas créditos
  const totalUsado = registros
    .filter(r => r.tipo === 'credito')
    .reduce((acc, r) => acc + (Number(r.valor) || 0), 0);

  // 2. Calcula saldo disponível
  const saldoDisponivel = Math.max(limite - totalUsado, 0);

  // 3. Percentual usado
  const percentualUsado =
    limite > 0 ? Math.min((totalUsado / limite) * 100, 100) : 0;

  return {
    totalUsado,
    saldoDisponivel,
    percentualUsado
  };
}
