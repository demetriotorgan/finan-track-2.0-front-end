import { useEffect, useState } from "react";
import api from "../api/api";

export function useCarregarCartoes() {
    const [cartoes, setCartoes] = useState([]);
    const [carregandoCartoes, setCarregandoCartoes] = useState(false);

    const carregarCartoes = async () => {
        try {
            setCarregandoCartoes(true);
            const response = await api.get('/listar-cartoes');
            console.log(response.data);
            setCartoes(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setCarregandoCartoes(false);
        }
    };

    useEffect(() => {
        carregarCartoes();
    }, []);


    return {
        cartoes,
        carregandoCartoes,        
        carregarCartoes
    }
}