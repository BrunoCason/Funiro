import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api";
import { Product } from "../Mocks/dataProps";

const Sec3Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <h2 className="font-poppins font-bold text-4.5xl text-FontColor text-center pb-8 pt-14">
        Our Products
      </h2>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
          {products.slice(0, 8).map((product, index) => (
            <div key={index} className="bg-LightBG w-72 relative ">
              <a href={`product/${product.id}`}>
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
                {product.images.length > 0 && (
                  <img
                    src={product.images[0]}
                    alt={`Product ${index} Image`}
                    className="w-72 h-80 mb-2 "
                  />
                )}

                <h2 className="font-poppins font-semibold text-2xl text-Gray1 mb-2 pt-4 pl-4">
                  {product.product_name}
                </h2>
                <p className="font-poppins font-medium text-base text-Gray3 pl-4">
                  {product.message_card}
                </p>
                <p className="font-poppins font-semibold text-xl text-Gray1 pb-8 pl-4">
                  <span>
                    Rp{" "}
                    {product.discount > 0
                      ? (product.price * (1 - product.discount / 100)).toFixed(
                          2
                        )
                      : product.price}{" "}
                  </span>
                  <span className="font-poppins font-normal text-base text-Gray4 line-through absolute left-44">
                    Rp {product.discount > 0 ? product.price.toFixed(2) : ""}
                  </span>
                </p>
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <a href="/shop">
          <button className="font-poppins font-semibold text-base bg-white text-Primary border border-Primary w-64 h-12 mt-8">
            <a href="/shop">Show More</a>
          </button>
        </a>
      </div>
    </div>
  );
};

export default Sec3Products;
