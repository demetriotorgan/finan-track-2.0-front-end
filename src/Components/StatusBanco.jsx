import React from 'react';
import '../Styles/StatusBanco.css';
import { Database, CheckCircle, XCircle, Loader } from 'lucide-react';
import { useStatusAPI } from '../Hooks/useStatusAPI';

const StatusBanco = () => {
  const { status, loading, error } = useStatusAPI();

  if (loading) {
    return (
      <div className="status-card loading">
        <Loader className="spin" />
        Verificando conexão...
      </div>
    );
  }

  if (error || !status) {
    return (
      <div className="status-card erro">
        <XCircle />
        API fora do ar
      </div>
    );
  }

  const conectado = status.mongo === 'conectado';

  return (
    <div className={`status-card ${conectado ? 'ok' : 'erro'}`}>
      <Database />
      <div>
        <strong>Banco de Dados</strong>
        <p>{conectado ? 'Conectado' : 'Não conectado'}</p>
      </div>
      {conectado ? <CheckCircle /> : <XCircle />}
    </div>
  );
};

export default StatusBanco;
