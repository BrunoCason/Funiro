import { ADD_ITEM, REMOVE_ITEM, CLEAR_CART, AddItemAction, RemoveItemAction, ClearCartAction, CartItem } from "./types";

export const addItem = (item: CartItem): AddItemAction => ({
  type: ADD_ITEM,
  payload: item,
});

export const removeItem = (id: number): RemoveItemAction => ({
  type: REMOVE_ITEM,
  payload: { id },
});

export const clearCart = (): ClearCartAction => ({
  type: CLEAR_CART,
});
