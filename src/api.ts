// src/api.ts
export const fetchProducts = async () => {
    const response = await fetch('https://run.mocky.io/v3/46d3842e-fe96-4449-be33-45f5b24f0451');
    const data = await response.json();
    return data.products;
  };
  