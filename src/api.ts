// src/api.ts
export const fetchProducts = async () => {
    const response = await fetch('https://run.mocky.io/v3/69fc70c4-70c9-4afe-bfd7-03e9e3193848');
    const data = await response.json();
    return data.products;
  };
  