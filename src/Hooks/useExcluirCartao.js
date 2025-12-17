import { useState } from "react";
import api from "../api/api";

export function useExcluirCartao({ carregarCartoes }) {
    const [excluindoCartao, setExcluindoCartao] = useState(false);

    const excluirCartao = async (id) => {
        const confirmar = window.confirm('Deseja excluir este cartão?');
        if(!confirmar) return
        
        try {
            setExcluindoCartao(true);
            const response = await api.delete(`/excluir-cartao/${id}`);
            console.log(response.data);
            carregarCartoes();
        } catch (error) {
            console.log(error);
        } finally {
            setExcluindoCartao(false);
        }
    };
    return {
        excluindoCartao,
        excluirCartao
    }
}