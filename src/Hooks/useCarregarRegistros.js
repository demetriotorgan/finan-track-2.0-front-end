import { useEffect, useState } from "react";
import api from "../api/api";

export function useCarregarRegistros(){
 const [carregarRegistros, setCarregarRegistros] = useState([]);
    const [carregandoRegistros, setCarregandoRegistros] = useState(false);

    const carregarUltimosRegistros = async () => {
        try {
            setCarregandoRegistros(true);
            const response = await api.get('/listar-registros');
            // console.log(response.data);
            setCarregarRegistros(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setCarregandoRegistros(false);
        }
    };

    useEffect(() => {
        carregarUltimosRegistros();
    }, []);

    return{
        carregarRegistros,
        carregandoRegistros,
        carregarUltimosRegistros
    }
};
