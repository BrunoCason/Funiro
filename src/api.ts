import axios from 'axios';

const api = axios.create({
  baseURL: 'https://run.mocky.io/v3/d500938d-ae26-4b35-bc7b-aaf57df99116',
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