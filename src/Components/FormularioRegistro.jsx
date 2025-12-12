import React, { useState } from 'react'
import '../Styles/FormularioRegistro.css'

const FormularioRegistro = () => {
  const dadosInicial = {
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

  const handleSubmit = () => {

  }

  return (
    <form className="form-registro" onSubmit={handleSubmit}>

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
        Natureza
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
          <option value="outro">Outros</option>
        </select>
      </label>

      <button type="submit" className="btn btn-salvar">Salvar</button>

    </form>
  )
}

export default FormularioRegistro
