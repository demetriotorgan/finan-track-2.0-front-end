import React from 'react'
import Carregando from '../Components/Carregando';
import BarraLimite from './BarraLimite';
import { isoToDate } from '../utils/time';
import { Trash } from 'lucide-react';
import ModalCarregando from './ModalCarregando';

const CardCartao = ({cartoes, carregandoCartoes, excluindoCartao, excluirCartao}) => {
  return (
    <div className='container'>
                <h2>Cartões Salvos</h2>

                {carregandoCartoes && <Carregando label='carregando...' />}
                {excluindoCartao && <ModalCarregando label='Excluindo' />}
                <div className="cartoes-grid">
                    {cartoes.map((cartao, index) => (
                        <div key={index} className='card-cartao'>

                            <div className="card-cartao-header">
                                <h3><button className='btn-excluir' onClick={()=>excluirCartao(cartao._id)}><Trash/></button> {cartao.descricao}</h3>
                                
                            </div>

                            <div className="card-cartao-body">
                                <div className="cartao-info">
                                    <span>Limite</span>
                                    <strong>{cartao.limite}</strong>
                                </div>

                                <div className="cartao-info">
                                    <span>Valor Inicial</span>
                                    <strong>{cartao.valorInicial}</strong>
                                </div>
                            </div>

                            <div className="card-cartao-barra">
                                <BarraLimite />
                            </div>

                            <div className="card-cartao-footer">
                                <span>{isoToDate(cartao.data)}</span>
                            </div>

                        </div>
                    ))}
                </div>
    </div>

  )
}

export default CardCartao