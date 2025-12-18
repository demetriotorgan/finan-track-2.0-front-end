import React from 'react'
import Carregando from '../Components/Carregando';
import BarraLimite from './BarraLimite';
import { isoToDate } from '../utils/time';
import { Trash } from 'lucide-react';
import ModalCarregando from './ModalCarregando';
import { limiteCartao } from '../utils/limiteCartao';

const CardCartao = ({ cartoes, registros, carregandoCartoes, excluindoCartao, excluirCartao }) => {
    return (
        <div className='container'>
            <h2>Cartões Salvos</h2>

            {carregandoCartoes && <Carregando label='carregando...' />}
            {excluindoCartao && <ModalCarregando label='Excluindo' />}
            <div className="cartoes-grid">
                {cartoes.map((cartao, index) => {
                    const {
                        totalUsado,
                        saldoDisponivel,
                        percentualUsado
                    } = limiteCartao(registros, cartao.limite);

                    return (
                        <div key={index} className='card-cartao'>

                            <div className="card-cartao-header">
                                <h3>
                                    <button
                                        className='btn-excluir'
                                        onClick={() => excluirCartao(cartao._id)}
                                    >
                                        <Trash />
                                    </button>
                                    {cartao.descricao}
                                </h3>
                            </div>

                            <div className="card-cartao-body">
                                <div className="cartao-info">
                                    <span>Limite</span>
                                    <strong>R$ {cartao.limite}</strong>
                                </div>

                                <div className="cartao-info">
                                    <span>Total Usado</span>
                                    <strong>R$ {totalUsado}</strong>
                                </div>

                                <div className="cartao-info">
                                    <span>Disponível</span>
                                    <strong>R$ {saldoDisponivel}</strong>
                                </div>
                            </div>
                             <div className="cartao-percentual">
                                    <span>Usado:</span>
                                    <strong>{percentualUsado.toFixed(2)}%</strong>
                                </div>
                            <div className="card-cartao-barra">
                                <BarraLimite percentualUsado={percentualUsado} />
                            </div>

                            <div className="card-cartao-footer">
                                <span>{isoToDate(cartao.data)}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

    )
}

export default CardCartao