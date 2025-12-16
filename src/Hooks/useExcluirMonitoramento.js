import { useState } from "react";
import api from "../api/api";

export function useExcluirMonitoramento({carregarMonitoramentos}){
const [excluindoMonitoramento, setExcluindoMonitoramento] = useState(false);

const excluirMonitoramento = async(id)=>{
    const confirmar = window.confirm('Deseja excluir este registro?');
    if(!confirmar) return

    try {
      setExcluindoMonitoramento(true);
      const response = await api.delete(`/excluir-monitoramento/${id}`);
      console.log(response.data);
      alert('Registro excluido com sucesso');
      carregarMonitoramentos();
    } catch (error) {
      console.log(error);
    }finally{
      setExcluindoMonitoramento(false);
    }
  };
    return{
    excluindoMonitoramento,
    excluirMonitoramento
    }
}