import CardsProducts from "./CardsProducts";

const Sec3Products = () => {
  return (
    <main>
      <h2 className="font-poppins font-bold text-4.5xl text-Gray1 text-center pt-16">
        Our Products
      </h2>
      <CardsProducts maxCards={8} />
      <div className="flex justify-center">
        <a href="/shop">
          <button className="font-poppins font-semibold text-base bg-white text-Primary border border-Primary w-64 h-12 mt-8">
            Show More
          </button>
        </a>
      </div>
    </main>
  );
};

export default Sec3Products;
