import React, { useState } from 'react'
import '../Styles/FormularioRegistro.css'
import { ArrowBigLeft, Save } from 'lucide-react';

const FormularioRegistro = () => {
  const dadosInicial = {
    descricao:'',
    valor: '',
    tipo: 'credito',
    gasto: 'essencial',
    categoria: 'supermercado'

  }

  const [dados, setDados] = useState(dadosInicial);

  const handleDados = (e) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      descricao: dados.descricao,
      valor: dados.valor,
      tipo: dados.tipo,
      gasto: dados.gasto,
      categoria: dados.categoria
    }
    console.log('Payload: ', payload);
  }

  return (
    <form className="form-registro" onSubmit={handleSubmit}>
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
          value={dados.tipo}
          onChange={handleDados}>
          <option value="credito">Crédito</option>
          <option value="debito">Débito</option>
          <option value="pix">Débito</option>
        </select>
      </label>

      <label>
        Gasto
        <select 
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
          onChange={handleDados}
        >
          <option value="supermercado">Supermercado</option>
          <option value="bebidas">Bebidas</option>
          <option value="lanche">Lanche</option>
          <option value="abastecimento">Abastecimento</option>
          <option value="agua">Água</option>
          <option value="luz">Luz</option>
          <option value="internet">Internet</option>
          <option value="internet">Farmácia</option>
          <option value="outro">Outros</option>
        </select>
      </label>

      <button type="submit" className="btn btn-salvar"><Save /> Salvar</button>
      <button className='btn btn-editar'><ArrowBigLeft />Voltar</button>
    </form>
  )
}

export default FormularioRegistro
