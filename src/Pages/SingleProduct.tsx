import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BreadCrumb from "../Components/BreadCrumb";
import { Product, ApiResponse } from "../Mocks/dataProps";
import CardsProducts from "../Components/CardsProducts";

const SingleProduct = () => {
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
          "https://run.mocky.io/v3/1f6dc9bd-04ac-46c0-be07-e62abee83b92"
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

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return <div className="text-center font-poppins font-medium text-2xl pt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center font-poppins font-medium text-2xl pt-10 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center font-poppins font-medium text-2xl pt-10">Product not found.</div>;
  }

  return (
    <main className="container mx-auto">
      <BreadCrumb productName={product.product_name}/>
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
          <p className="font-poppins font-medium text-2xl text-9F9F9F pb-4">
            Rs. <span>{product.price.toFixed(2)}</span>
          </p>
          <div className="flex justify-center lg:justify-normal">
            <p>{product.recommendation_stars}</p>
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
              className={`inline-block h-8 w-8 rounded-md cursor-pointer text-center p-1 font-poppins font-normal text-sm mr-4 ${
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
              <input type="radio" name="color" className="hidden" />
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
            <button className="font-poppins font-normal text-xl text-black w-215px h-16 text-center border border-black rounded-2xl ml-12">
              Add To Cart
            </button>
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
        <div className="grid grid-cols-1 justify-items-center items-center lg:grid-cols-2">
          <img
            src={product.images[0]}
            alt={`${product.product_name} - Image 1`}
            className="h-301px w-285px mb-7 lg:mb-0"
          />
          {product.images.length > 1 && (
            <img
              src={product.images[1]}
              alt={`${product.product_name} - Image 2`}
              className="h-301px w-285px"
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
          <button className="font-poppins font-semibold text-base bg-white text-Primary border border-Primary w-64 h-12 mt-8 mb-20">
            Show More
          </button>
        </a>
      </div>
    </main>
  );
};

export default SingleProduct;