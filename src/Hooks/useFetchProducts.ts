import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../Mocks/dataProps";

interface FetchProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
}

// busca o produto com a url
export const useFetchProducts = (url: string): FetchProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // função assincrona para buscar os produtos da API
    const fetchProducts = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data;
        if (data && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setError("Error fetching products");
        }
      } catch (error) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [url]);

  return { products, loading, error };
};
