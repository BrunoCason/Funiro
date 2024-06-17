import { ADD_ITEM, REMOVE_ITEM, AddItemAction, RemoveItemAction, CartItem } from "./types";

export const addItem = (item: CartItem): AddItemAction => {
  return {
    type: ADD_ITEM,
    payload: item
  };
};

export const removeItem = (id: number): RemoveItemAction => {
  return {
    type: REMOVE_ITEM,
    payload: { id }
  };
};