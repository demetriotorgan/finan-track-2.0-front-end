import { PiggyBank, Save } from 'lucide-react'
import React from 'react'
import ModalCarregando from './ModalCarregando';
import { useSalvarRegistro } from '../Hooks/useSalvarRegistro';

const Registro = () => {
    const { dados, salvandoRegistro, handleDados, salvarRegistro } = useSalvarRegistro();
    return (
        <>
        {salvandoRegistro && <ModalCarregando label='Salvando' />}      
            <div className='container'>
                <h2><PiggyBank /> Novo Gasto</h2>
            </div>
            <form className="form-registro" onSubmit={salvarRegistro}>
                <label>
                    Descricao
                    <input
                        type='text'
                        name='descricao'
                        placeholder='Descreva o gasto'
                        value={dados.descricao}
                        onChange={handleDados}
                    />
                </label>
                <label>
                    Valor
                    <input
                        type="number"
                        name="valor"
                        placeholder="Valor gasto (R$)"
                        value={dados.valor}
                        onChange={handleDados}
                    />
                </label>

                <label>
                    Tipo do Pagamento
                    <select
                        name='tipo'
                        value={dados.tipo}
                        onChange={handleDados}>
                        <option value="credito">Crédito</option>
                        <option value="debito">Débito</option>
                        <option value="pix">Pix</option>
                    </select>
                </label>

                <label>
                    Gasto
                    <select
                        name='gasto'
                        value={dados.gasto}
                        onChange={handleDados}>
                        <option value="essencial">Essencial</option>
                        <option value="nao-essencial">Não-Essencial</option>
                    </select>
                </label>

                <label>
                    Categoria
                    <select
                        name="categoria"
                        value={dados.categoria}
                        onChange={handleDados}>
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
                    Data
                    <input
                        type='date'
                        name='data'
                        value={dados.data}
                        onChange={handleDados} />
                </label>
                <button type="submit" className="btn btn-salvar"><Save /> Salvar</button>
            </form>
        </>
    )
}

export default Registro