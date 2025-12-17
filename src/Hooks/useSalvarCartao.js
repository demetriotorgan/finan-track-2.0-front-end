import { useState } from "react";
import { dateToIso } from "../utils/time";
import api from "../api/api";

export function useSalvarCartao({carregarCartoes}) {
    const hoje = new Date();

    const cartaoInicial = {
        descricao: '',
        limite: '',
        valorInicial: '',
        data: hoje.toISOString().slice(0, 10)
    }
    const [cartao, setCartao] = useState(cartaoInicial);
    const [salvandoCartao, setSalvandoCartao] = useState(false);

    const handleCartao = (e) => {
        const { name, value } = e.target;
        setCartao({ ...cartao, [name]: value });
    };

    const salvarCartao = async () => {
        const confirmar = window.confirm('Deseja salvar este registro?');
        if (!confirmar) return

        const payload = {
            descricao: cartao.descricao,
            limite: cartao.limite,
            valorInicial: cartao.valorInicial,
            data: dateToIso(cartao.data)
        }

        try {
            setSalvandoCartao(true);
            const response = await api.post('/salvar-cartao', payload);
            console.log(response.data);
            alert('Cartão salvo com sucesso');
            setCartao(cartaoInicial);
            carregarCartoes();
        } catch (error) {
            console.log(error)
        } finally {
            setSalvandoCartao(false);
        }
    };

    return {
        cartao,
        handleCartao,
        salvarCartao,
        salvandoCartao
    }
}