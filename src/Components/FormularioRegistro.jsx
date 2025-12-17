import React, { useState } from 'react'
import '../Styles/FormularioRegistro.css'
import { ArrowBigLeft} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Cartao from './Cartao';
import Registro from './Registro';

const FormularioRegistro = () => {
  const navigate = useNavigate();
  const handleVoltar = () => {
    navigate('/')
  } 

  return (
    <>      
      <Registro />
      <Cartao />
      <div className='container'>
        <button type='button' className='btn btn-editar' onClick={handleVoltar}><ArrowBigLeft />Voltar</button>
      </div>
    </>
  )
}

export default FormularioRegistro
