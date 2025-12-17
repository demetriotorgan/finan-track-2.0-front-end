import { Save, Wallet } from 'lucide-react'
import React, { useState } from 'react'
import { dateToIso } from '../utils/time';
import api from '../api/api';
import { useSalvarCartao } from '../Hooks/useSalvarCartao';
import ModalCarregando from './ModalCarregando';

const Cartao = () => {
    const {cartao, handleCartao, salvarCartao, salvandoCartao} = useSalvarCartao();

    return (
        <>
        {salvandoCartao && <ModalCarregando label='Salvando' />}
            <div className='container'>
                <h2><Wallet /> Novo Cartão</h2>
            </div>
            <div className='form-registro'>
                <label>
                    Descrição
                    <input
                        type='text'
                        name='descricao'
                        value={cartao.descricao}
                        onChange={handleCartao}
                    />
                </label>
                <label>
                    Limite
                    <input
                        type='number'
                        name='limite'
                        value={cartao.limite}
                        onChange={handleCartao}
                    />
                </label>
                <label>
                    Valor Inicial
                    <input
                        type='number'
                        name='valorInicial'
                        value={cartao.valorInicial}
                        onChange={handleCartao}
                    />
                </label>
                <label>
                    <input 
                    type='date'
                    name='data'
                    value={cartao.data}
                    onChange={handleCartao}
                    />
                </label>
                <button className='btn btn-salvar' onClick={salvarCartao}><Save /> Salvar</button>
            </div>
        </>
    )
}

export default Cartao