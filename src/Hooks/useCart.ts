import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { clearCart, removeFromCart } from "../Store/Reducers/CartReducer";
import { CartItem } from "../Store/types";

export const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // soma todos os produtos do carrinho
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
  };

  // soma a quantidade do produto
  const calculateSubtotal = (item: CartItem) => {
    return item.quantity * item.price;
  };

  // remove um item do carrinho
  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  // remove todos os itens do carrinho
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
