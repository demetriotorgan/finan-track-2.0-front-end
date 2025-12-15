import { useState } from "react";
import api from "../api/api";
import { dateToIso, isoToDateEdit } from "../utils/time";


export function useSalvarObjetivo({carregarObjetivos}) {
    const hojeISO = new Date().toISOString();

    const objetivoInicial = {
        descricao: '',
        limite: '',
        tipo: 'credito',
        categoria: 'supermercado',
        periodo: '1',
        gasto:'essencial',
        data: isoToDateEdit(hojeISO)
    };

    const [dadosObjetivo, setDadosObjetivo] = useState(objetivoInicial);
    const [salvandoObjetivo, setSalvandoObjetivo] = useState(false);

    const handleDados = (e) => {
        const { name, value } = e.target
        setDadosObjetivo({ ...dadosObjetivo, [name]: value });
    };

    const salvarObjetivo = async () => {
        const payload = {
            descricao: dadosObjetivo.descricao,
            limite: dadosObjetivo.limite,
            tipo: dadosObjetivo.tipo,
            categoria: dadosObjetivo.categoria,
            periodo: dadosObjetivo.periodo,
            gasto: dadosObjetivo.gasto,
            data: dateToIso(dadosObjetivo.data)
        }

        const confirmar = window.confirm('Deseja salvar este objetivo?');
        if (!confirmar) return

        try {
            setSalvandoObjetivo(true);
            console.log('Paylaod', payload)
            const response = await api.post('/salvar-objetivo', payload);
            console.log(response.data);
            alert('Objetivo salvo com sucesso');
            setDadosObjetivo(objetivoInicial);
            carregarObjetivos();

        } catch (error) {
            console.log(error);
        } finally {
            setSalvandoObjetivo(false);
        }
    };

    return {
        dadosObjetivo,
        handleDados,
        salvarObjetivo
    }
}