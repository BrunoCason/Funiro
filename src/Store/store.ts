import { createStore, combineReducers, applyMiddleware, Reducer } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
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

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware())
);

const persistor = persistStore(store);

export { store, persistor, Provider };
