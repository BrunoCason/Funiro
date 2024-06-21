import { Link } from "react-router-dom";
import { useCart } from "../Hooks/useCart";

const CartProducts = () => {
  const { cartItems, calculateTotal, calculateSubtotal, handleRemoveItem } =
    useCart();

    // formata o preço
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(undefined, { style: "decimal" }).format(price);
  };

  return (
    <main className="container mx-auto my-10">
      <div className="flex flex-col items-center lg:items-start lg:flex-row lg:mx-10">
        <div className="w-4/4 sm:w-3/4">
          <div className=" flex items-center justify-around bg-F9F1E7 lg:mr-9 h-14 mb-9">
            <p className="font-poppins font-medium text-base md:pl-16 2xl:pl-9">
              Product
            </p>
            <p className="font-poppins font-medium text-base">Price</p>
            <p className="font-poppins font-medium text-base">Quantity</p>
            <p className="font-poppins font-medium text-base">Subtotal</p>
          </div>
          <div>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="md:flex items-center mb-5">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 rounded-lg md:mr-4 xl:mr-8 mb-4 md:mb-0 mx-auto md:mx-0"
                    />
                  )}
                  <div className="flex justify-between items-center">
                    <span className="font-poppins font-normal text-base text-9F9F9F md:w-28 lg:w-20 xl:w-40 2xl:w-56">
                      <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </span>
                    <span className="font-poppins font-normal text-base text-9F9F9F md:w-32 lg:w-32 xl:w-44 2xl:w-60">
                      Rs. {formatPrice(item.price)}
                    </span>
                    <div className="md:mr-0 lg:mr-3 xl:mr-16 2xl:mr-36 w-28">
                      <input
                        value={item.quantity}
                        type="number"
                        className="font-poppins font-medium text-base text-black w-28 h-12 text-center border border-9F9F9F rounded-2xl bg-transparent"
                      />
                      <button className="-ml-20 mr-8">-</button>
                      <button className="">+</button>
                    </div>
                    <span className="font-poppins font-normal text-base md:w-28 lg:w-24 xl:w-24 2xl:w-32 ml-6">
                      {formatPrice(calculateSubtotal(item))}
                    </span>
                  </div>
                  <img
                    src="https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/icon-delete.png"
                    alt="icon delete"
                    className="cursor-pointer mx-auto mt-3 md:mt-0"
                    onClick={() => handleRemoveItem(item.id)}
                  />
                </div>
              ))
            ) : (
              <p className="font-poppins font-semibold flex justify-center py-10">
                The cart is empty
              </p>
            )}
          </div>
        </div>
        <div className="bg-F9F1E7 w-96 h-96 flex flex-col items-center">
          <p className="font-poppins font-semibold text-3xl pt-4">
            Cart Totals
          </p>
          <p className="font-poppins font-medium text-base mt-16 mb-8">
            Subtotal{" "}
            <span className="font-poppins font-normal text-base text-9F9F9F ml-14">
              Rs. {formatPrice(calculateTotal())}
            </span>
          </p>
          <p className="font-poppins font-medium text-base mb-12">
            Total{" "}
            <span className="font-poppins font-medium text-xl text-Primary ml-16">
              Rs. {formatPrice(calculateTotal())}
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
