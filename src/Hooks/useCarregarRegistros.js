import { useEffect, useState } from "react";
import api from "../api/api";

export function useCarregarRegistros(){
 const [carregarRegistros, setCarregarRegistros] = useState([]);
    const [loading, setLoading] = useState(false);

    const carregarUltimosRegistros = async () => {
        try {
            setLoading(true);
            const response = await api.get('/listar-registros');
            console.log(response.data);
            setCarregarRegistros(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarUltimosRegistros();
    }, []);

    return{
        carregarRegistros,
        loading,
        carregarUltimosRegistros
    }
};
