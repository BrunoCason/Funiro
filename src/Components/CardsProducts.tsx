import { Link } from "react-router-dom";
import ButtonAddToCart from "./ButtonAddToCart";
import { useFetchProducts } from "../Hooks/useFetchProducts";

interface CardsProductsProps {
  maxCards: number;
}

const CardsProducts = ({ maxCards }: CardsProductsProps) => {
  // utiliza o hooke useFetchProducts para buscar os produtos no mocky
  const { products, loading, error } = useFetchProducts(
    "https://run.mocky.io/v3/013c64c0-9291-48dd-8454-5d354e4da6bf"
  );

  // voltar ao inicio da pagina quando clicar no card
  const handleCardClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // formata o preço
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(undefined, { style: "decimal" }).format(price);
  };

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
    <main className="container mx-auto mt-16">
      <div className="flex justify-center mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.slice(0, maxCards).map((product) => (
              <div
                key={product.id}
                className="bg-LightBG w-285px relative hover:scale-105 duration-300"
              >
                <Link key={product.id} to={`/product/${product.id}`}>
                  <div>
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
                      <div
                        className="flex justify-center items-center mt-2"
                        onClick={handleCardClick}
                      >
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
