import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BreadCrumb from "../Components/BreadCrumb";
import { Product, ApiResponse } from "../Mocks/dataProps";

const SingleProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          "https://run.mocky.io/v3/89ae0fc8-ffc2-4cf5-8f92-f1e8c7591801"
        );
        const data = response.data;

        if (data && Array.isArray(data.products) && data.products.length > 0) {
          const foundProduct = data.products.find((p) => p.id === id);
          if (foundProduct) {
            setProduct(foundProduct);
          } else {
            setError("Produto não encontrado.");
          }
        } else {
          setError("Nenhum produto encontrado na API.");
        }
      } catch (error) {
        setError("Erro ao buscar dados da API");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1); // Incrementa a quantidade
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1); // Decrementa a quantidade, assegurando que não fique menor que 1
    }
  };

  if (loading) {
    return <div className="text-center">Carregando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center">Produto não encontrado.</div>;
  }

  return (
    <main className="container mx-auto">
      <BreadCrumb />
      <div className="flex">
        <div>
          {product.images.slice(1).map((image, index) => (
            <img
              key={index + 1}
              src={image}
              alt={`${product.product_name} - Image ${index + 2}`}
              className="w-76px h-20"
            />
          ))}
        </div>
        {product.images.length > 0 && (
          <img
            src={product.images[0]}
            alt={product.product_name}
            className="w-423px h-500px"
          />
        )}
      </div>
      <h2 className="font-poppins font-normal text-4.5xl text-black">
        {product.product_name}
      </h2>
      <p className="font-poppins font-medium text-2xl text-9F9F9F">
        Rs. <span>{product.price.toFixed(2)}</span>
      </p>
      <p className="font-poppins font-normal text-sm text-black">
        {product.short_description}
      </p>
      <p className="font-poppins font-normal text-sm text-9F9F9F">Size</p>
      {product.sizes.map((size, index) => (
        <label
          key={index}
          className={`inline-block h-8 w-8 rounded-md cursor-pointer text-center p-1 font-poppins font-normal text-sm  ${
            selectedSize === size ? "bg-Primary" : "bg-F9F1E7"
          }`}
          onClick={() => handleSizeChange(size)}
        >
          <input
            type="radio"
            name="size"
            className="hidden"
            checked={selectedSize === size}
          />
          <span className="text-black">{size}</span>
        </label>
      ))}
      <p className="font-poppins font-normal text-sm text-9F9F9F">Color</p>
      {product.colors.map((color, index) => (
        <label
          key={index}
          className={`inline-block h-8 w-8 rounded-full border cursor-pointer ${
            selectedColor === color ? "border-9F9F9F border-2" : "border-none"
          }`}
          style={{
            backgroundColor: color,
          }}
          onClick={() => handleColorChange(color)}
        >
          <input type="radio" name="color" className="hidden" />
        </label>
      ))}
      <br />
      <button onClick={handleDecrease}>-</button>
      <input
        type="number"
        value={quantity}
        className="font-poppins font-medium text-base text-black w-123px h-16 text-center border border-9F9F9F rounded-2xl"
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />
      <button onClick={handleIncrease}>+</button>
      <button className="font-poppins font-normal text-xl text-black w-215px h-16 text-center border border-black rounded-2xl">
        Add To Cart
      </button>
    </main>
  );
};

export default SingleProduct;
