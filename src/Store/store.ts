import { createStore, combineReducers } from 'redux';
import cartReducer from './Reducers/CartReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
