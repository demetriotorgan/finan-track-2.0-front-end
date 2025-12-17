import { Save, Wallet } from 'lucide-react'
import '../Styles/Cartao.css'
import React, { useEffect, useState } from 'react'
import { dateToIso, isoToDate } from '../utils/time';
import api from '../api/api';
import { useSalvarCartao } from '../Hooks/useSalvarCartao';
import ModalCarregando from './ModalCarregando';
import Carregando from '../Components/Carregando';
import BarraLimite from '../Components/BarraLimite';
import { useCarregarCartoes } from '../Hooks/useCarregarCartoes';
import CardCartao from './CardCartao';
import { useExcluirCartao } from '../Hooks/useExcluirCartao';


const Cartao = () => {
    const { cartoes, carregarCartoes, carregandoCartoes } = useCarregarCartoes();
    const { cartao, handleCartao, salvarCartao, salvandoCartao } = useSalvarCartao({carregarCartoes});
    const {excluindoCartao, excluirCartao} = useExcluirCartao({carregarCartoes});

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

            <CardCartao
                cartoes={cartoes}                
                carregandoCartoes={carregandoCartoes}
                excluindoCartao={excluindoCartao}
                excluirCartao={excluirCartao}
            />
        </>
    )
}

export default Cartao