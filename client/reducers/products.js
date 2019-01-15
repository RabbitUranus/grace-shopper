import axios from 'axios';

//ACTION TYPE
export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';

//INITIAL STATE

export const initialState = {products: []};

//ACTION CREATOR
export const requestProducts = products => ({
  type: REQUEST_PRODUCTS,
  payload: products
});

//THUNK CREATOR
export const fetchProducts = query => async dispatch => {
  const {data} = await axios.get(`/api/products${query || ''}`);
  const action = requestProducts(data);
  dispatch(action);
};

export default function products(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PRODUCTS:
      state.products = action.payload;
      return state.products;
    default:
      return state;
  }
}
