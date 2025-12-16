import { useState } from "react";
import api from "../api/api";
import { dateToIso, isoToDateEdit } from "../utils/time";

export function useSalvarMonitoramento({carregarMonitoramentos}) {
    const hojeISO = new Date().toISOString();

    const monitoramentoInicial = {
        descricao: '',
        tipo: 'credito',
        limite: '',
        periodo: '1',
        data: isoToDateEdit(hojeISO)
    }
    const [dadosMonitoramento, setDadosMonitoramento] = useState(monitoramentoInicial);
    const [salvandoMonitoramento, setSalvandoMonitoramento] = useState(false);

    const handleMonitoramento = (e) => {
        const { name, value } = e.target;
        setDadosMonitoramento({ ...dadosMonitoramento, [name]: value });
    }

    const salvarMonitoramento = async (e) => {
        const confirmar = window.confirm('Deseja salvar este monitoramento?');
        if (!confirmar) return

        const payload = {
            descricao: dadosMonitoramento.descricao,
            tipo: dadosMonitoramento.tipo,
            limite: dadosMonitoramento.limite,
            periodo: dadosMonitoramento.periodo,
            data: dateToIso(dadosMonitoramento.data)
        }

        try {
            setSalvandoMonitoramento(true);
            const response = await api.post('/salvar-monitoramento', payload);
            console.log(response.data);
            setDadosMonitoramento(monitoramentoInicial);
            carregarMonitoramentos()
        } catch (error) {
            console.log(error);
        }finally{
            setSalvandoMonitoramento(false);
        }
    };

    return {
        dadosMonitoramento,
        handleMonitoramento,
        salvarMonitoramento,
        salvandoMonitoramento
    }
}