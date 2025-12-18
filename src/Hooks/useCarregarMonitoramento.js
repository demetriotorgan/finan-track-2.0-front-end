import { useEffect, useState } from "react";
import api from "../api/api";

export function useCarregarMonitoramento(){
    const [monitoramentos, setMonitoramentos] = useState([]);
    const [carregandoMonitoramento, setCarregandoMonitoramento] = useState(false);

    const carregarMonitoramentos = async () => {
    try {
      setCarregandoMonitoramento(true);
      const response = await api.get('/listar-monitoramentos');
      console.log(response.data);
      setMonitoramentos(response.data);
    } catch (error) {
      console.log(error);
    }finally{
      setCarregandoMonitoramento(false);
    }
  };

  useEffect(() => {
    carregarMonitoramentos();
  }, []);

    return{
        monitoramentos,
        carregarMonitoramentos,
        carregandoMonitoramento
    }
}