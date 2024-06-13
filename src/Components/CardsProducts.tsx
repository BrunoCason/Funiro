import React, { useEffect, useState } from "react";
import { Product } from "../Mocks/dataProps";
import axios from "axios";
import { Link } from "react-router-dom";

interface CardsProductsProps {
  maxCards: number;
}

const CardsProducts: React.FC<CardsProductsProps> = ({ maxCards }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://run.mocky.io/v3/89ae0fc8-ffc2-4cf5-8f92-f1e8c7591801"
        );
        const data = response.data;
        if (data && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setError("Error");
        }
      } catch (error) {
        setError("Error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center">Carregando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <main className="container mx-auto mt-16">
      <div className="flex justify-center mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.slice(0, maxCards).map((product) => (
              <div key={product.id} className="bg-LightBG w-285px relative">
                <Link key={product.id} to={`/product/${product.id}`}>
                  {product.new && (
                    <div className="font-poppins font-medium text-base absolute rounded-full bg-GreenAccents text-white w-12 h-12 flex items-center justify-center mt-3 mr-3 right-0">
                      New
                    </div>
                  )}
                  {product.discount > 0 && (
                    <div
                      className={`font-poppins font-medium text-base absolute rounded-full bg-RedAccents text-white w-12 h-12 flex items-center justify-center mt-${
                        product.new ? "16" : "3"
                      } mr-3 right-0`}
                    >
                      -{product.discount}%
                    </div>
                  )}
                  <div className="">
                    {product.images.length > 0 && (
                      <img
                        src={product.images[0]}
                        alt={product.product_name}
                        className="h-301px w-285px"
                      />
                    )}
                  </div>
                  <div className="pl-4">
                    <h2 className="font-poppins font-semibold text-Gray1 text-2xl pt-4 pb-2">
                      {product.product_name}
                    </h2>
                    <p className="font-poppins font-medium text-Gray3 text-base">
                      {product.message_card}
                    </p>
                    <p className="font-poppins font-semibold text-Gray1 text-xl pt-2 pb-7">
                      <span>
                        Rp{" "}
                        {product.discount > 0
                          ? (
                              product.price *
                              (1 - product.discount / 100)
                            ).toFixed(2)
                          : product.price}{" "}
                      </span>
                      <span className="font-poppins font-normal text-base text-Gray4 line-through absolute left-40">
                        Rp{" "}
                        {product.discount > 0 ? product.price.toFixed(2) : ""}
                      </span>
                    </p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center">Nenhum produto encontrado.</div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CardsProducts;
