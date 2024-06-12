export const fetchProducts = async () => {
  const response = await fetch('https://run.mocky.io/v3/d500938d-ae26-4b35-bc7b-aaf57df99116');
  const data = await response.json();
  return data.products;
};
