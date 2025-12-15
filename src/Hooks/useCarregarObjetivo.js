import { useEffect, useState } from "react";
import api from "../api/api";

export function usecarregarObjetivo() {
    const [objetivos, setObjetivos] = useState([]);

    const carregarObjetivos = async () => {
        try {
            const response = await api.get('/listar-objetivos')
            console.log(response.data);
            setObjetivos(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        carregarObjetivos();
    }, []);

    return {
        objetivos
    }
}