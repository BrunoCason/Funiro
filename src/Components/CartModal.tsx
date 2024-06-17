import { useSelector } from "react-redux";
import { RootState } from "../Store/store";

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  if (!isOpen) return null;

  return (
    <div className="relative container mx-auto">
      <div className="absolute bg-white">
        <h2 className="font-poppins font-semibold text-2xl">Shopping Cart</h2>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="mb-2">
              <div className="flex justify-between">
                <span>{item.image}</span>
                <span>{item.name}</span>
                <span>
                  {item.quantity} x ${item.price}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="font-poppins font-semibold">The cart is empty</p>
        )}
        <p>Subtotal</p>
        <button
          className="mt-4 p-2 bg-red-500 text-white rounded"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default CartModal;
