import React, { useState } from "react";
import { Link } from "react-router-dom";
import ButtonAddToCart from "./ButtonAddToCart";
import { useFetchProducts } from "../Hooks/useFetchProducts";

const AllProducts = () => {
  const [maxCards, setMaxCards] = useState<number>(16);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [shortBy, setShortBy] = useState<"price_inc" | "price_desc" | "">("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { products, loading, error } = useFetchProducts(
    // utiliza o hooke useFetchProducts para buscar os produtos no mocky
    "https://run.mocky.io/v3/013c64c0-9291-48dd-8454-5d354e4da6bf"
  );

  // atualiza o quantidade de cards exibidos na tela
  const handleMaxCardsChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setMaxCards(Number(event.target.value));
    setCurrentPage(1);
  };

  // atualiza o estado de busca conforme digita
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  // filtro de ordenação
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setShortBy(event.target.value as "price_inc" | "price_desc" | "");
  };

  // filtro de pesquisa pelo nome e mensagem do card
  const filteredProducts = products.filter(
    (product) =>
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.message_card.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ordena os produtos
  const sortedProducts = [...filteredProducts];
  if (shortBy === "price_inc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (shortBy === "price_desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  // total de produtos e o numero total de paginas
  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / maxCards);

  // formata o preço
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(undefined, { style: "decimal" }).format(price);
  };

  // função para avançar a pagina 
  const handleNextPage = () => {
    setCurrentPage((prevPage) => {
      const newPage = Math.min(prevPage + 1, totalPages);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return newPage;
    });
  };

  // função para mudar para uma pagina específica
  const changePage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // indice inicial dos produtos exibidos
  const startIndex = (currentPage - 1) * maxCards;
  // exibição dos produtos na tela
  const displayedProducts = sortedProducts.slice(
    startIndex,
    startIndex + maxCards
  );

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

  // renderizar as paginas
  const renderPagination = () => {
    const pagination = [];

    // se o total de paginas for menor que 5, exibe todas
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pagination.push(
          <button
            key={i}
            onClick={() => changePage(i)}
            className={`bg-F9F1E7 h-14 w-14 font-poppins font-normal text-xl rounded-lg mx-3 ${
              currentPage === i ? "bg-Primary text-white" : ""
            }`}
          >
            {i}
          </button>
        );
      }
    // exibe a primeira página
    } else {
      pagination.push(
        <button
          key={1}
          onClick={() => changePage(1)}
          className={`bg-F9F1E7 h-14 w-14 font-poppins font-normal text-xl rounded-lg mx-3 ${
            currentPage === 1 ? "bg-Primary text-white" : ""
          }`}
        >
          1
        </button>
      );

      // se passar da terceira pagina exibe o ...
      if (currentPage > 3) {
        pagination.push(
          <span className="bg-F9F1E7 h-14 w-14 font-poppins font-normal text-xl rounded-lg mx-3 text-center pt-2">
            ...
          </span>
        );
      }

       // exibe paginas entre currentPage - 1 e currentPage + 1
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pagination.push(
          <button
            key={i}
            onClick={() => changePage(i)}
            className={`bg-F9F1E7 h-14 w-14 font-poppins font-normal text-xl rounded-lg mx-3 ${
              currentPage === i ? "bg-Primary text-white" : ""
            }`}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        pagination.push(
          <span className="bg-F9F1E7 h-14 w-14 font-poppins font-normal text-xl rounded-lg mx-3 text-center pt-2">
            ...
          </span>
        );
      }

      // exibe a uktima pagina
      pagination.push(
        <button
          key={totalPages}
          onClick={() => changePage(totalPages)}
          className={`bg-F9F1E7 h-14 w-14 font-poppins font-normal text-xl rounded-lg mx-3 ${
            currentPage === totalPages ? "bg-Primary text-white" : ""
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pagination;
  };

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
            <p className="mx-1">
              {startIndex + 1} - {startIndex + displayedProducts.length}
            </p>
            <span>of {totalProducts} results</span>
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
            <option value={36}>36</option>
            <option value={72}>72</option>
            <option value={144}>144</option>
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
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-LightBG w-285px relative hover:scale-105 duration-300"
              >
                <Link to={`/product/${product.id}`}>
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
                    <ButtonAddToCart product={product} />
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
                          ? formatPrice(
                              product.price * (1 - product.discount / 100)
                            )
                          : formatPrice(product.price)}{" "}
                      </span>
                      {product.discount > 0 && (
                        <span className="font-poppins font-normal text-base text-Gray4 line-through absolute left-40">
                          {`Rp ${formatPrice(product.price)}`}
                        </span>
                      )}
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
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          {renderPagination()}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-F9F1E7 h-14 w-24 font-poppins font-normal text-xl rounded-lg"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
};

export default AllProducts;
