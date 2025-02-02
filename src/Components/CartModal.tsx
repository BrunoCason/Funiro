import { Link } from "react-router-dom";
import { useCart } from "../Hooks/useCart";

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const { cartItems, calculateTotal, handleRemoveItem, handleClearCart } = useCart();

  // não aparece na tela se estiver null
  if (!isOpen) return null;

  // formata o preço
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(undefined, { style: 'decimal' }).format(price);
  };

  return (
    <main className="fixed top-0 container mx-auto flex justify-end z-50">
      <div
        className="fixed inset-0 bg-black opacity-50 "
        onClick={onClose}
      ></div>
        <div className="bg-white w-96 z-50">
          <div className="flex mx-6 mb-10">
            <h2 className="font-poppinems-ces font-semibold text-2xl py-6 w-64 mr-14 border-D9D9D9 border-b">
              Shopping Cart
            </h2>
            <img
              src="https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/icon-clean-cart.png"
              alt="icon clean cart"
              className="w-4 h-5 mt-8 ml-1 cursor-pointer"
              onClick={handleClearCart}
            />
          </div>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="mb-2 flex ml-7">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-lg mr-8 mb-2"
                  />
                )}
                <div className="pt-5 w-44">
                  <span className="font-poppins font-normal text-base">
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </span>
                  <br />
                  <span className="font-poppins font-light text-base">
                    {item.quantity} x{" "}
                    <span className="font-poppins font-medium text-xs text-Primary">
                      Rs. {formatPrice(item.price)}
                    </span>
                  </span>
                </div>
                <img
                  src="https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/icon-close.png"
                  alt="icon close"
                  className="w-5 h-5 mt-9 ml-2 cursor-pointer"
                  onClick={() => handleRemoveItem(item.id)}
                />
              </div>
            ))
          ) : (
            <p className="font-poppins font-semibold text-center">The cart is empty</p>
          )}
          <div className="flex mt-20">
            <p className="font-poppins font-normal text-base ml-7 mr-20">
              Subtotal
            </p>
            <span className="font-poppins font-semibold text-base text-Primary">
              Rs. {formatPrice(calculateTotal())}
            </span>
          </div>
          <div className="flex justify-center border-D9D9D9 border-t mt-6 pt-6 mb-6">
            <a
              href="/cart"
              className="font-poppins font-normal text-xs border border-black rounded-full py-1 px-5"
            >
              Cart
            </a>
            <a
              href="/checkout"
              className="font-poppins font-normal text-xs border border-black rounded-full py-1 px-5 mx-6"
            >
              Checkout
            </a>
            <a
              href="/*"
              className="font-poppins font-normal text-xs border border-black rounded-full py-1 px-5"
            >
              Comparison
            </a>
          </div>
        </div>
    </main>
  );
};

export default CartModal;
