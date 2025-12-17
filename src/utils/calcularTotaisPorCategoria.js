export function calcularTotaisPorCategoria(
  registros = [],
  filtroMesAno = null
) {
  if (!Array.isArray(registros)) return [];

  let registrosFiltrados = registros;

  // 🔹 aplica filtro por mês/ano se informado
  if (filtroMesAno) {
    const { mes, ano } = filtroMesAno;

    registrosFiltrados = registros.filter((r) => {
      if (!r.data) return false;

      const data = new Date(r.data);
      return (
        data.getMonth() + 1 === mes &&
        data.getFullYear() === ano
      );
    });
  }

  const registrosComCategoria = registrosFiltrados.filter(
    (r) => r.categoria && r.categoria.trim() !== ''
  );

  const totaisPorCategoria = registrosComCategoria.reduce((acc, registro) => {
    const { categoria, gasto, valor } = registro;

    if (!acc[categoria]) {
      acc[categoria] = { essencial: 0, 'nao-essencial': 0 };
    }

    if (gasto === 'essencial' || gasto === 'nao-essencial') {
      acc[categoria][gasto] += Number(valor) || 0;
    }

    return acc;
  }, {});

  return Object.entries(totaisPorCategoria).map(
    ([categoria, valores]) => ({
      categoria,
      essencial: valores.essencial,
      naoEssencial: valores['nao-essencial'],
    })
  );
}
