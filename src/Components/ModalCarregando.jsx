import React from 'react'
import '../Styles/ModalCarregando.css'

const ModalCarregando = ({label}) => {
  return (
    <div className="modal-loading">
        <div className="loader"></div>
        <p>{label}</p>
    </div>
  )
}

export default ModalCarregando