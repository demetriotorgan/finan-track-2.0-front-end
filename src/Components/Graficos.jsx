import React from 'react'
import { calcularTotaisPorTipo } from '../utils/CalculoGraficoPizza'
import GraficoPizza from '../Components/GraficoPizza'
import { useCarregarRegistros } from '../Hooks/useCarregarRegistros'
import { ArrowBigLeft, ChartPie } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import '../Styles/Graficos.css'

const Graficos = () => {
    const navigate = useNavigate();
    const handleVoltar = () => {
        navigate('/')
    };
    const { carregarRegistros, loading } = useCarregarRegistros()

    const dadosGraficoCredito = calcularTotaisPorTipo(carregarRegistros, 'credito');
    const dadosGraficoDebito = calcularTotaisPorTipo(carregarRegistros, 'debito');
    const dadosGraficoPix = calcularTotaisPorTipo(carregarRegistros, 'pix');

    const temDados = (dados) => {
        if (!dados) return false
        if (Array.isArray(dados)) {
            return dados.some(item => (item.value ?? 0) > 0)
        }
        return Object.values(dados).some(v => v > 0)
    }

    if (loading) return null   

    return (
        <div className="container">
            <h2><ChartPie /> Graficos de gastos</h2>
            {!temDados(dadosGraficoDebito) && (
                <div className="grafico-vazio">
                    📊 Aguardando dados para exibir os gráficos de Débitos
                </div>
            )}

             {!temDados(dadosGraficoCredito) && (
                <div className="grafico-vazio">
                    📊 Aguardando dados para exibir os gráficos de Créditos
                </div>
            )}

             {!temDados(dadosGraficoPix) && (
                <div className="grafico-vazio">
                    📊 Aguardando dados para exibir os gráficos de Pix
                </div>
            )}


            {temDados(dadosGraficoCredito) && (
                <GraficoPizza
                    titulo="Gasto no Crédito"
                    data={dadosGraficoCredito}
                />
            )}

            {temDados(dadosGraficoDebito) && (
                <GraficoPizza
                    titulo="Gasto no Débito"
                    data={dadosGraficoDebito}
                />
            )}

            {temDados(dadosGraficoPix) && (
                <GraficoPizza
                    titulo="Gasto no Pixs"
                    data={dadosGraficoPix}
                />
            )}

            <button className='btn btn-editar' onClick={handleVoltar}><ArrowBigLeft /> Voltar</button>
        </div>
    )
}

export default Graficos
