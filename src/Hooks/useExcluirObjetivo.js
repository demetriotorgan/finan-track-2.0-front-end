import { useState } from "react";
import api from "../api/api";

export function useExcluirObjetivo({carregarObjetivos}) {
    const [excluindoObjetivo, setExcluindoObjetivo] = useState(false);

    const excluirObjetivo = async (id) => {
        const confirmar = window.confirm('Deseja realmente excluir este registro?');
        if (!confirmar) return

        try {
            setExcluindoObjetivo(true);
            const response = await api.delete(`/deletar-objetivo/${id}`);
            console.log(response.data);
            carregarObjetivos();
        } catch (error) {
            console.log(error)
        } finally {
            setExcluindoObjetivo(false);
        }
    }

    return {
        excluindoObjetivo,
        excluirObjetivo
    }
}