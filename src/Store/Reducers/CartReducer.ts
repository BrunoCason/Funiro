import { AnyAction } from 'redux';

const initialState = {
  items: [] as { id: string; name: string; price: number; quantity: number; }[],
};

const ADD_TO_CART = 'ADD_TO_CART';

export const addToCart = (product: { id: string; name: string; price: number }) => {
  return {
    type: ADD_TO_CART,
    payload: product,
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
    default:
      return state;
  }
};

export default cartReducer;
