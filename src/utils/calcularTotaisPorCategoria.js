// utils/calcularTotaisPorCategoria.js

export function calcularTotaisPorCategoria(registros = []) {
  if (!Array.isArray(registros)) return [];

  const registrosComCategoria = registros.filter(
    r => r.categoria && r.categoria.trim() !== ''
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

  // transforma em array para o map da UI
  return Object.entries(totaisPorCategoria).map(
    ([categoria, valores]) => ({
      categoria,
      essencial: valores.essencial,
      naoEssencial: valores['nao-essencial'],
    })
  );
}
