export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";

export interface AddItemAction {
  type: typeof ADD_ITEM;
  payload: CartItem;
}

export interface RemoveItemAction {
  type: typeof REMOVE_ITEM;
  payload: { id: number };
}

export type CartActionTypes = AddItemAction | RemoveItemAction;
