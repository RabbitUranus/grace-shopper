import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from '../reducers/user.js';
import products from '../reducers/products.js';
import cart from '../reducers/cart.js';

const reducer = combineReducers({user, products, cart});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
);
const store = createStore(reducer, middleware);

export default store;
export * from '../reducers/user.js';
export * from '../reducers/products.js';
export * from '../reducers/cart.js';
