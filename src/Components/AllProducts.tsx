import React, { useEffect, useState } from "react";
import { Product } from "../Mocks/dataProps";
import axios from "axios";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [maxCards, setMaxCards] = useState<number>(16);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [shortBy, setShortBy] = useState<"price_inc" | "price_desc" | "">("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://run.mocky.io/v3/3f99fa67-160c-4dab-8396-a3ee0ae91ed5"
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

  const handleMaxCardsChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setMaxCards(Number(event.target.value));
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setShortBy(event.target.value as "price_inc" | "price_desc" | "");
  };

  const filteredProducts = products.filter(
    (product) =>
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.message_card.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredProducts];
  if (shortBy === "price_inc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (shortBy === "price_desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  if (loading) {
    return (
      <div className="text-center font-poppins font-medium text-2xl pt-10">
        Loading Products
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-poppins font-normal text-2xl pt-10">
        {error}
      </div>
    );
  }

  return (
    <main className="container mx-auto">
      <div className="md:flex items-center md:justify-between bg-F9F1E7 px-3 lg:px-5 xl:px-24 py-6">
        <div className="flex items-center justify-center pb-5 md:pb-0">
          <img
            src="https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/icon-filter1.png"
            alt="icon filter 1"
          />
          <p className="font-poppins font-normal text-xl mx-6">Filter</p>
          <img
            src="https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/icon-filter2.png"
            alt="icon filter 2"
            className="mr-6"
          />
          <img
            src="https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/icon-filter3.png"
            alt="icon filter 3"
          />
          <div className="lg:flex font-poppins font-normal text-base border-l border-9F9F9F pl-6 ml-6">
            <p>Showing</p>
            <p className="mx-1">1 - {maxCards}</p>
            <span>of {products.length} results</span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <label className="mr-4 font-poppins font-normal lg:text-xl">
            Show
          </label>
          <select
            id="maxCards"
            value={maxCards}
            onChange={handleMaxCardsChange}
            className="text-center w-14 h-14 font-poppins font-normal text-xl text-9F9F9F focus:outline-none"
          >
            <option value={16}>16</option>
            <option value={32}>32</option>
            <option value={64}>64</option>
            <option value={128}>128</option>
          </select>
          <select
            id="sortOptions"
            value={shortBy}
            onChange={handleSortChange}
            className="text-center focus:outline-none bg-transparent font-poppins font-normal lg:text-xl mx-3"
          >
            <option value="">Short By</option>
            <option value="price_inc">Low to High</option>
            <option value="price_desc">High to Low</option>
          </select>
          <input
            type="text"
            id="searchInput"
            placeholder="Default"
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="font-poppins font-normal lg:text-xl text-9F9F9F pl-7 h-14 w-32 lg:w-48 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex justify-center mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedProducts.length > 0 ? (
            sortedProducts.slice(0, maxCards).map((product) => (
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
                  <div className="absolute inset-0 flex justify-center items-center flex-col opacity-0 duration-300 transition-colors hover:bg-Gray1 hover:opacity-90">
                    <div className="bg-white text-Primary px-14 py-3 text-center font-poppins font-semibold text-base">
                      Add to cart
                    </div>
                    <div className="flex justify-center items-center mt-2">
                      <img
                        src="https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/icon-share.png"
                        alt="icon compare"
                        className="mr-1"
                      />
                      <p className="font-poppins font-semibold text-base text-white">
                        Share
                      </p>

                      <img
                        src="https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/icon-compare.png"
                        alt="icon compare"
                        className="ml-5 mr-1"
                      />
                      <p className="font-poppins font-semibold text-base text-white mr-5">
                        Compare
                      </p>

                      <img
                        src="https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/icon-like.png"
                        alt="icon compare"
                        className="mr-1"
                      />
                      <p className="font-poppins font-semibold text-base text-white">
                        Like
                      </p>
                    </div>
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
            <div className="text-center font-poppins font-medium text-2xl pt-10">
              Product Not Found
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AllProducts;
