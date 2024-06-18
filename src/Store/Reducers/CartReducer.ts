import { AnyAction } from 'redux';
import { CartState, ADD_ITEM, REMOVE_ITEM, CLEAR_CART, CartItem } from '../types';

export const addToCart = (item: CartItem) => ({
  type: ADD_ITEM,
  payload: item,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const removeFromCart = (id: number) => ({
  type: REMOVE_ITEM,
  payload: { id },
});

const initialState: CartState = {
  items: [],
};

const cartReducer = (state = initialState, action: AnyAction) => {
  let existingItemIndex;

  switch (action.type) {
    case ADD_ITEM:
      existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;
        return {
          ...state,
          items: updatedItems,
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          { ...action.payload, quantity: 1 },
        ],
      };
    case REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    case CLEAR_CART:
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
