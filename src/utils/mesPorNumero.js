export function mesPorNumero(numeroMes) {
  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];

  const index = Number(numeroMes) - 1;

  if (index < 0 || index > 11 || isNaN(index)) {
    return 'Mês inválido';
  }

  return meses[index];
}
