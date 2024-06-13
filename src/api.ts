import axios from 'axios';

const api = axios.create({
  baseURL: 'https://run.mocky.io/v3/89ae0fc8-ffc2-4cf5-8f92-f1e8c7591801',
});

// Função para obter dados da API
export const getData = async () => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    throw error;
  }
};

export default api;