// src/hooks/useSalvarRegistro.js
import { useState } from 'react';
import somMoeda from '../assets/somMoeda.mp3'
import api from '../api/api';
import { dateToIso, isoToDateEdit } from '../utils/time';

const audioMoeda = new Audio(somMoeda);
audioMoeda.preload = 'auto';


export function useSalvarRegistro() {
  const hoje = new Date();

  const dadosInicial = {
    descricao:'',
    valor: '',
    tipo: 'credito',
    gasto: 'essencial',
    categoria: 'supermercado',
    data: hoje.toISOString().slice(0, 10)
  }

  const [dados, setDados] = useState(dadosInicial);
  const [salvandoRegistro, setSalvandoRegistro] = useState(false);

  const handleDados = (e) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
  };

   // 🔐 Validação centralizada
  const validarRegistro = () => {
    if (!dados.descricao.trim()) {
      return 'Informe a descrição do registro.';
    }

    if (!dados.valor || isNaN(dados.valor) || Number(dados.valor) <= 0) {
      return 'Informe um valor válido maior que zero.';
    }

    if (!dados.tipo) {
      return 'Informe o tipo do registro.';
    }

    if (!dados.gasto) {
      return 'Informe a natureza do gasto.';
    }

    if (!dados.categoria) {
      return 'Informe a categoria.';
    }

    if (!dados.data) {
      return 'Informe uma data válida.';
    }

    return null; // ✅ Tudo OK
  };

  const salvarRegistro = async(e) => {  
    e.preventDefault();

     // 🔎 Validação antes de tudo
    const erro = validarRegistro();
    if (erro) {
      alert(`❌ ${erro}`);
      return;
    }

     const payload = {
      descricao: dados.descricao,
      valor: dados.valor,
      tipo: dados.tipo,
      gasto: dados.gasto,
      categoria: dados.categoria,
      data: dateToIso(dados.data)
    }

    const confirmar = window.confirm('Deseja realmente salvar este registro?');
    if (!confirmar) return  

    try {
      setSalvandoRegistro(true);
      const response = await api.post('/salvar-registro', payload);
      // console.log(response.data)
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
