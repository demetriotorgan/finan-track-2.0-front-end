// src/hooks/useSalvarRegistro.js
import { useState } from 'react';
import somMoeda from '../assets/somMoeda.mp3'
import api from '../api/api';
import { isoToDateEdit } from '../utils/time';

const audioMoeda = new Audio(somMoeda);
audioMoeda.preload = 'auto';


export function useSalvarRegistro() {
  const hojeISO = new Date().toISOString();

  const dadosInicial = {
    descricao:'',
    valor: '',
    tipo: 'credito',
    gasto: 'essencial',
    categoria: 'supermercado',
    data: isoToDateEdit(hojeISO)

  }

  const [dados, setDados] = useState(dadosInicial);
  const [salvandoRegistro, setSalvandoRegistro] = useState(false);

  const handleDados = (e) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
  }

  const salvarRegistro = async(e) => {  
    e.preventDefault();

     const payload = {
      descricao: dados.descricao,
      valor: dados.valor,
      tipo: dados.tipo,
      gasto: dados.gasto,
      categoria: dados.categoria
    }

    const confirmar = window.confirm('Deseja realmente salvar este registro?');
    if (!confirmar) return  

    try {
      setSalvandoRegistro(true);
      const response = await api.post('/salvar-registro', payload);
      console.log(response.data)
      alert('Registro salvo com sucesso');   
      setDados(dadosInicial);    
      audioMoeda.currentTime=0;
      audioMoeda.play();      
    } catch (error) {
      console.error('❌ Erro ao salvar registro:', error);
      alert('Erro ao salvar registro');
    } finally {
        setSalvandoRegistro(false);
    }
  };

  return { 
    dados,    
    salvandoRegistro,
    handleDados,
    salvarRegistro
  };
}
