import React, { useState } from 'react'
import { dateToIso, isoToDateEdit } from '../utils/time';
import api from '../api/api';
import { useSalvarObjetivo } from '../Hooks/useSalvarObjetivo';
import CardObjetivo from './CardObjetivo';
import { useNavigate } from 'react-router-dom';
import { ArrowBigLeft } from 'lucide-react';
import { usecarregarObjetivo } from '../Hooks/useCarregarObjetivo';
import { useExcluirObjetivo } from '../Hooks/useExcluirObjetivo';

const Objetivos = () => {  
    const { objetivos, loading,carregarObjetivos } = usecarregarObjetivo();
    const {excluindoObjetivo, excluirObjetivo} = useExcluirObjetivo({carregarObjetivos});
    const {dadosObjetivo, handleDados, salvarObjetivo} = useSalvarObjetivo({carregarObjetivos});

  return (
    <>
    <div className='container'>
      <h2>Cadastrar Objetivos</h2>
      <div className='form-registro'>
        <label>
        Descrição
        <input 
        type='text'
        name='descricao'
        value={dadosObjetivo.descricao}
        onChange={handleDados}
        />
      </label>
      <label>
        Limite
        <input 
        type='number'
        name='limite'
        value={dadosObjetivo.limite}
        onChange={handleDados}
        />
      </label>
      <label>
        Categoria
        <select name='categoria' value={dadosObjetivo.categoria} onChange={handleDados}>
          <option value="supermercado">Supermercado</option>
          <option value="bebidas">Bebidas</option>
          <option value="lanche">Lanche</option>
          <option value="abastecimento">Abastecimento</option>
          <option value="agua">Água</option>
          <option value="luz">Luz</option>
          <option value="internet">Internet</option>
          <option value="farmacia">Farmácia</option>
          <option value="outro">Outros</option>
        </select>
      </label>
      <label>
        Período
        <select name='periodo' value={dadosObjetivo.periodo} onChange={handleDados}>
          <option value="1">Janeiro</option>
          <option value="2">Feveiro</option>
          <option value="3">Março</option>
          <option value="4">Abril</option>
          <option value="5">Maio</option>
          <option value="6">Junho</option>
          <option value="7">Julho</option>
          <option value="8">Agosto</option>
          <option value="9">Setembro</option>
          <option value="10">Outubro</option>
          <option value="11">Novembro</option>
          <option value="12">Dezembro</option>
        </select>
      </label>
      <label>
        Data
        <input 
        type='date'
        name='data'
        value={dadosObjetivo.data}
        onChange={handleDados}
        />
      </label>
      <button className='btn btn-salvar' onClick={salvarObjetivo}>Salvar</button>
      </div>           
    </div>
    <CardObjetivo
    objetivos={objetivos}
    loading={loading}
    excluirObjetivo={excluirObjetivo}
    />
    
    </>
  )
}

export default Objetivos