import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { clearCart, removeFromCart } from "../Store/Reducers/CartReducer";
import { CartItem } from "../Store/types";

export const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
  };

  const calculateSubtotal = (item: CartItem) => {
    return item.quantity * item.price;
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return {
    cartItems,
    calculateTotal,
    calculateSubtotal,
    handleRemoveItem,
    handleClearCart,
  };
};
