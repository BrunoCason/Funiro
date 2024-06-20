import { Link } from "react-router-dom";
import { useCart } from "../Hooks/useCart";

const CartProducts = () => {
  const { cartItems, calculateTotal, calculateSubtotal , handleRemoveItem } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(undefined, { style: 'decimal' }).format(price);
  };

  return (
    <main className="container mx-auto my-10">
      <div className="flex flex-col items-center lg:items-start lg:flex-row lg:mx-10">
        <div className="w-3/4">
          <div className=" flex items-center justify-around bg-F9F1E7 mr-9 h-14 mb-9">
            <p className="font-poppins font-medium text-base pl-8">Product</p>
            <p className="font-poppins font-medium text-base">Price</p>
            <p className="font-poppins font-medium text-base">Quantity</p>
            <p className="font-poppins font-medium text-base">Subtotal</p>
          </div>
          <div>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center mb-5">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 rounded-lg mr-8"
                    />
                  )}
                  <span className="font-poppins font-normal text-base text-9F9F9F w-64">
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </span>
                  <span className="font-poppins font-normal text-base text-9F9F9F w-60">
                    Rs. {formatPrice(item.price)}
                  </span>
                  <span className="font-poppins font-bold text-base w-64">
                    {item.quantity}
                  </span>
                  <span className="font-poppins font-normal text-base w-32">
                    {formatPrice(calculateSubtotal(item))}
                  </span>
                  <img
                    src="https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/icon-delete.png"
                    alt="icon delete"
                    className="cursor-pointer"
                    onClick={() => handleRemoveItem(item.id)}
                  />
                </div>
              ))
            ) : (
              <p className="font-poppins font-semibold flex justify-center py-10">The cart is empty</p>
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
