import { AnyAction } from 'redux';

const initialState = {
  items: [] as { id: string; name: string; price: number; quantity: number; image: string; }[],
};

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CLEAR_CART = 'CLEAR_CART';

export const addToCart = (product: { id: string; name: string; price: number; image: string; }) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

export const removeFromCart = (id: string) => {
  return {
    type: REMOVE_FROM_CART,
    payload: { id },
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

const cartReducer = (state = initialState, action: AnyAction) => {
  let existingItemIndex;

  switch (action.type) {
    case ADD_TO_CART:
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
    case REMOVE_FROM_CART:
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
