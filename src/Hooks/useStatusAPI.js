import { useEffect, useState } from 'react';
import api from '../api/api';

export function useStatusAPI() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await api.get('/status');
        setStatus(res.data);
      } catch (err) {
        setError('Erro ao conectar com a API');
      } finally {
        setLoading(false);
      }
    }

    fetchStatus();
  }, []);

  return { status, loading, error };
}
