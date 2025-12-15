import React from 'react'
import '../Styles/BarraLimite.css'

const BarraLimite = ({percentualUsado}) => {
    // Garante que a barra não ultrapasse 100%
  const percentualSeguro = Math.min(percentualUsado, 100);

  // Classe dinâmica para cor
  let nivel = 'baixo';
  if (percentualUsado >= 70) nivel = 'medio';
  if (percentualUsado >= 100) nivel = 'alto';

  return (
    <div className="barra-limite">
      <div
        className={`barra-limite-preenchida ${nivel}`}
        style={{ width: `${percentualSeguro}%` }}
      />
    </div>
  )
}

export default BarraLimite