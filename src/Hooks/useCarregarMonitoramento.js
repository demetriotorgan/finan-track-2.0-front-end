import { useEffect, useState } from "react";
import api from "../api/api";

export function useCarregarMonitoramento(){
    const [monitoramentos, setMonitoramentos] = useState([]);

    const carregarMonitoramentos = async () => {
    try {
      const response = await api.get('/listar-monitoramentos');
      console.log(response.data);
      setMonitoramentos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    carregarMonitoramentos();
  }, []);

    return{
        monitoramentos,
        carregarMonitoramentos
    }
}