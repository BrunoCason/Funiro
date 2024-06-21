import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BreadCrumb from "../Components/BreadCrumb";
import { Product, ApiResponse } from "../Mocks/dataProps";
import CardsProducts from "../Components/CardsProducts";
import { useDispatch } from "react-redux";
import { addToCart } from "../Store/Reducers/CartReducer";

const SingleProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatch();
  const [addToCartEnabled, setAddToCartEnabled] = useState<boolean>(false);
  const [cartMessage, setCartMessage] = useState<string>("");

  // busca o produto com base no id ao clicar no card
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          "https://run.mocky.io/v3/013c64c0-9291-48dd-8454-5d354e4da6bf"
        );
        const data = response.data;

        if (data && Array.isArray(data.products) && data.products.length > 0) {
          const foundProduct = data.products.find((p) => p.id === id);
          if (foundProduct) {
            setProduct(foundProduct);
          } else {
            setError("Product not found.");
          }
        } else {
          setError("Product not found.");
        }
      } catch (error) {
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // altera o titulo da pagina para o nome do atual produto
  useEffect(() => {
    if (product !== null) {
      document.title = product.product_name;
    }
  }, [product]);

  // função para verificar se a color e size foi selecionado antes de permitir adicionar ao carrinho
  const checkAddToCartEnabled = (color: string, size: string) => {
    if (color !== "" && size !== "") {
      setAddToCartEnabled(true);
    } else {
      setAddToCartEnabled(false);
    }
  };

  // mudança da color
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    checkAddToCartEnabled(color, selectedSize);
  };

  // mudança do size
  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    checkAddToCartEnabled(selectedColor, size);
  };

  // incrementa 1 no input
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  // dedcrementa 1 no input
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // formata o price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(undefined, { style: "decimal" }).format(price);
  };

  if (loading) {
    return (
      <div className="text-center font-poppins font-medium text-2xl pt-10">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center font-poppins font-medium text-2xl pt-10 text-red-500">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center font-poppins font-medium text-2xl pt-10">
        Product not found.
      </div>
    );
  }

  // função para adicionar no carrinho
  const handleAddToCart = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    product: Product
  ) => {
    event.preventDefault();

    let image = "";
    if (product.images.length > 0) {
      image = product.images[0];
    }

    dispatch(
      addToCart({
        id: parseInt(product.id),
        name: product.product_name,
        price: product.price,
        image: image,
        quantity: quantity, // o quantity é o atual valor do input
      })
    );
    setQuantity(1);

    setCartMessage(`${product.product_name} added to cart!`);
    setTimeout(() => {
      setCartMessage("");
    }, 3000);
  };

  return (
    <main className="container mx-auto pt-24">
      <BreadCrumb productName={product.product_name} />
      <div className=" lg:flex justify-center">
        <div className="mr-8 flex justify-center lg:block">
          {product.images.slice(1).map((image, index) => (
            <img
              key={index + 1}
              src={image}
              alt={`${product.product_name} - Image ${index + 2}`}
              className="rounded-lg w-76px h-20 mb-4 mr-2 lg:mr-0"
            />
          ))}
        </div>
        {product.images.length > 0 && (
          <img
            src={product.images[0]}
            alt={product.product_name}
            className="w-423px h-500px mx-auto lg:mx-0 rounded-lg p-3 sm:p-0"
          />
        )}
        <div className=" text-center pl-0 lg:text-start lg:pl-10 xl:pl-40">
          <h2 className="font-poppins font-normal text-4.5xl text-black pt-2 pb-2">
            {product.product_name}
          </h2>
          <p className="font-poppins font-medium text-9F9F9F text-2xl pt-2 pb-7">
            <span>
              Rs.{" "}
              {product.discount > 0
                ? formatPrice(product.price * (1 - product.discount / 100))
                : formatPrice(product.price)}{" "}
            </span>
            {product.discount > 0 && (
              <span className="font-poppins font-normal text-base text-Gray4 line-through">
                {`Rs. ${formatPrice(product.price)}`}
              </span>
            )}
          </p>
          <div className="flex justify-center lg:justify-normal">
            {product.recommendation_stars.slice(0).map((image, index) => (
              <img
                key={index + 1}
                src={image}
                alt={`${product.recommendation_stars} - Image ${index + 2}`}
                className=" mb-4 mr-2 lg:mr-0"
              />
            ))}
            <p className="font-poppins font-normal text-sm text-9F9F9F border-l border-9F9F9F ml-5 pl-5">
              {product.customer_review} <span>Customer Review</span>
            </p>
          </div>
          <p className="font-poppins font-normal text-sm text-black w-80 sm:w-446px pt-4 pb-5 mx-auto">
            {product.short_description}
          </p>
          <p className="font-poppins font-normal text-sm text-9F9F9F pb-3 -ml-3 lg:ml-0">
            Size
          </p>
          {product.sizes.map((size, index) => (
            <label
              key={index}
              className={`inline-flex items-center justify-center h-8 w-8 rounded-md cursor-pointer mr-4 ${
                selectedSize === size ? "bg-Primary" : "bg-F9F1E7"
              }`}
              onClick={() => handleSizeChange(size)}
            >
              <input
                type="radio"
                name="size"
                className="hidden"
                checked={selectedSize === size}
                onChange={() => handleSizeChange(size)}
              />
              <span
                className={`font-poppins font-normal text-sm ${
                  selectedSize === size ? "text-white" : "text-black"
                }`}
              >
                {size}
              </span>
            </label>
          ))}
          <p className="font-poppins font-normal text-sm text-9F9F9F pt-4 pb-3 -ml-3 lg:ml-0">
            Color
          </p>
          {product.colors.map((color, index) => (
            <label
              key={index}
              className={`inline-block h-8 w-8 rounded-full border cursor-pointer mr-4 ${
                selectedColor === color
                  ? "border-9F9F9F border-2"
                  : "border-none"
              }`}
              style={{
                backgroundColor: color,
              }}
              onClick={() => handleColorChange(color)}
            >
              <input
                type="radio"
                name="color"
                className="hidden"
                onChange={() => handleColorChange(color)}
              />
            </label>
          ))}
          <br />
          <div>
            <input
              type="number"
              value={quantity}
              className="font-poppins font-medium text-base text-black w-123px h-16 text-center border border-9F9F9F rounded-2xl mt-8 bg-transparent"
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
            <button onClick={handleDecrease} className="-ml-24 mr-12">
              -
            </button>
            <button onClick={handleIncrease} className="">
              +
            </button>
            <button
              className={`font-poppins font-normal text-xl text-black w-215px h-16 text-center border border-black rounded-2xl ml-12 ${
                addToCartEnabled ? "" : "cursor-not-allowed"
              }`}
              onClick={(event) =>
                addToCartEnabled && handleAddToCart(event, product)
              }
              disabled={!addToCartEnabled}
            >
              Add To Cart
            </button>
            {cartMessage && (
              <p className="text-green-500 font-poppins font-medium text-base mt-3">
                {cartMessage}
              </p>
            )}
          </div>
          <div className="border-t border-D9D9D9 mt-14 pt-10">
            <p className="font-poppins font-normal text-base text-9F9F9F ">
              SKU <span className="lg:pl-14">: {product.sku}</span>
            </p>
            <p className="font-poppins font-normal text-base text-9F9F9F pt-3 pb-3">
              Category <span className="lg:pl-3">: {product.category}</span>
            </p>
            <p className="font-poppins font-normal text-base text-9F9F9F pb-3">
              Tags <span className="lg:pl-12">: {product.tags.join(", ")}</span>
            </p>
            <p className="font-poppins font-normal text-base text-9F9F9F flex justify-center lg:justify-normal">
              Share{" "}
              <span className="flex lg:pl-11">
                {" "}
                :
                <a href="https://www.facebook.com" target="_blank">
                  <img
                    className="h-5 w-5 ml-2"
                    src="https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/icon-facebook-black.png"
                    alt="facebook icon"
                  />
                </a>
                <a href="https://www.linkedin.com" target="_blank">
                  <img
                    className="h-5 w-5 mr-6 ml-6"
                    src="https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/icon-linkedin-black.png"
                    alt="linkedin icon"
                  />
                </a>
                <a href="https://x.com" target="_blank">
                  <img
                    className="h-5 w-5"
                    src="https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/icon-twitter-black.png"
                    alt="twitter icon"
                  />
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
      <hr className="border-D9D9D9 mt-16 mb-16" />
      <div className="grid grid-cols-1 sm:grid-cols-2 text-center">
        <div>
          <p className="font-poppins font-medium text-2xl ">Description</p>
        </div>
        <div>
          <p className="font-poppins font-normal text-2xl text-9F9F9F">
            Additional Information
          </p>
        </div>
      </div>
      <p className="font-poppins font-normal text-base text-9F9F9F text-justify pt-9 pb-9 pl-5 pr-5 lg:pl-40 lg:pr-40">
        {product.full_description}
      </p>
      {product.images.length > 0 && (
        <div className="grid grid-cols-1 justify-items-center items-center lg:grid-cols-2 mx-4">
          <img
            src={product.images[0]}
            alt={`${product.product_name} - Image 1`}
            className="h-301px w-96 mb-7 lg:mb-0 rounded-xl"
          />
          {product.images.length > 1 && (
            <img
              src={product.images[1]}
              alt={`${product.product_name} - Image 2`}
              className="h-301px w-96 rounded-xl"
            />
          )}
        </div>
      )}
      <hr className="border-D9D9D9 mt-16 mb-16" />
      <h2 className="font-poppins font-medium text-4xl text-center mb-16">
        Related Products
      </h2>
      <CardsProducts maxCards={4} />
      <div className="flex justify-center">
        <a href="/shop">
          <button className="font-poppins font-semibold text-base bg-white text-Primary border border-Primary w-64 h-12 mt-8 mb-20 hover:bg-Primary hover:text-white duration-300">
            Show More
          </button>
        </a>
      </div>
    </main>
  );
};

export default SingleProduct;
