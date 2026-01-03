import { mesPorNumero } from './mesPorNumero';

/**
 * Agrupa registros por mês/ano
 * 🔹 Usa UTC para evitar bugs de fuso horário
 * 🔹 Mantém a ordem original da API
 * 🔹 Ordena apenas os meses (mais recente → mais antigo)
 */
export function agruparRegistrosPorMes(registros = []) {
  if (!Array.isArray(registros)) return [];

  const grupos = {};

  registros.forEach((registro) => {
    if (!registro.data) return;

    const data = new Date(registro.data);

    // ✅ USAR UTC
    const ano = data.getUTCFullYear();
    const mes = data.getUTCMonth() + 1;

    const chave = `${ano}-${mes}`;

    if (!grupos[chave]) {
      grupos[chave] = {
        ano,
        mes,
        titulo: `${mesPorNumero(mes)} / ${ano}`,
        registros: []
      };
    }

    // 🔹 Mantém a ordem da API
    grupos[chave].registros.push(registro);
  });

  // 🔹 Ordena apenas os meses
  return Object.values(grupos).sort((a, b) => {
    const dataA = new Date(Date.UTC(a.ano, a.mes - 1));
    const dataB = new Date(Date.UTC(b.ano, b.mes - 1));
    return dataB - dataA;
  });
}
