import { createStore, combineReducers, Reducer } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './Reducers/CartReducer';
import { CartState } from './types';

export interface RootState {
  cart: CartState;
}

const rootReducer: Reducer<RootState> = combineReducers({
  cart: cartReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
