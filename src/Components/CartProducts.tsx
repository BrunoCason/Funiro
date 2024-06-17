const CartProducts = () => {
  return (
    <main className="container mx-auto my-10">
      <div className="flex mx-10">
        <div className="flex justify-around items-center bg-F9F1E7 mr-9 h-14 w-3/4">
          <p className="font-poppins font-medium text-base">Product</p>
          <p className="font-poppins font-medium text-base">Price</p>
          <p className="font-poppins font-medium text-base">Quantity</p>
          <p className="font-poppins font-medium text-base">Subtotal</p>
        </div>
        <div className="bg-F9F1E7 w-96 h-96 text-center">
          <p className="font-poppins font-semibold text-3xl pt-4">
            Cart Totals
          </p>
          <p className="font-poppins font-medium text-base mt-16 mb-8">
            Subtotal{" "}
            <span className="font-poppins font-normal text-base text-9F9F9F">
              Rs.{" "}
            </span>
          </p>
          <p className="font-poppins font-medium text-base mb-12">
            Total{" "}
            <span className="font-poppins font-medium text-xl text-Primary">
              Rs.{" "}
            </span>
          </p>
          <a
            href="/checkout"
            className="font-poppins font-normal text-xl px-14 py-3 border border-black rounded-2xl"
          >
            Check Out
          </a>
        </div>
      </div>
    </main>
  );
};

export default CartProducts;
