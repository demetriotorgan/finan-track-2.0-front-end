import { useEffect, useState } from "react";
import api from "../api/api";

export function usecarregarObjetivo() {
    const [objetivos, setObjetivos] = useState([]);
    const [loading, setLoading] = useState(false);

    const carregarObjetivos = async () => {
        try {
            setLoading(true);
            const response = await api.get('/listar-objetivos')
            console.log(response.data);
            setObjetivos(response.data);
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarObjetivos();
    }, []);

    return {
        objetivos,
        loading
    }
}