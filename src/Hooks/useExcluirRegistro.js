import { useState } from "react";
import api from "../api/api";


export function useExcluirRegistro({carregarUltimosRegistros}){
const [excluindo, setExcluindo] = useState(false);

const excluirRegistro = async(item)=>{
        const confirmar = window.confirm('Deseja excluir este registro?');
        if(!confirmar) return

        try {
            setExcluindo(true);
            const response = await api.delete(`/deletar-registro/${item._id}`);
            // console.log(response.data);
            alert('Registro excluido com sucesso');
            carregarUltimosRegistros();
        } catch (error) {
            console.log(error);
            alert('Erro ao excluir o registro');
        }finally{
            setExcluindo(false);
        }
   };
    return{
        excluindo,
        excluirRegistro,

    }
}