import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { clearCart, removeFromCart } from "../Store/Reducers/CartReducer";

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const subtotal = calculateSubtotal();

  return (
    <main className="fixed top-0 right-0 bg-gray-100 shadow-lg">
      <div className="container mx-auto">
        <div className="bg-white w-96">
          <div className="flex border-D9D9D9 border-b ml-7 mb-10">
            <h2 className="font-poppinems-ces font-semibold text-2xl py-6 mr-40">
              Shopping Cart
            </h2>
            <img
              src="https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/icon-clean-cart.png"
              alt="icon clean cart"
              className="w-4 h-5 mt-8 cursor-pointer"
              onClick={handleClearCart}
            />
          </div>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="mb-2 flex ml-7">
                {item.image && (
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="h-24 w-24 rounded-lg mr-8 mb-2"
                  />
                )}
                <div className="pt-5  w-48">
                  <span className="font-poppins font-normal text-base">
                    {item.name}
                  </span>
                  <br />
                  <span className="font-poppins font-light text-base">
                    {item.quantity} x{" "}
                    <span className="font-poppins font-medium text-xs text-Primary">
                      ${item.price}
                    </span>
                  </span>
                </div>
                <img
                  src="https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/icon-close.png"
                  alt="icon close"
                  className="w-5 h-5 mt-9 cursor-pointer"
                  onClick={() => handleRemoveItem(item.id)}
                />
              </div>
            ))
          ) : (
            <p className="font-poppins font-semibold">The cart is empty</p>
          )}
          <div className="flex mt-10">
            <p className="font-poppins font-normal text-base ml-7 mr-20">
              Subtotal
            </p>
            <span className="font-poppins font-semibold text-base text-Primary">
              Rs. {subtotal}
            </span>
          </div>
          <div className="flex justify-center px-7 border-D9D9D9 border-t mt-6 pt-6">
            <a
              href=""
              className="font-poppins font-normal text-xs border border-black rounded-full px-3"
            >
              Cart
            </a>
            <a
              href=""
              className="font-poppins font-normal text-xs border border-black rounded-full px-3 mx-6"
            >
              Checkout
            </a>
            <a
              href="/*"
              className="font-poppins font-normal text-xs border border-black rounded-full px-3"
            >
              Comparison
            </a>
          </div>

          <button
            className="mt-4 p-2 bg-red-500 text-white rounded"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </main>
  );
};

export default CartModal;
