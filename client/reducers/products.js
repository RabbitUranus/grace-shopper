import axios from 'axios';

//ACTION TYPE
const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';

//INITIAL STATE

const initialState = {products: []};

//ACTION CREATOR
export const requestProducts = products => ({
  type: REQUEST_PRODUCTS,
  payload: products
});

//THUNK CREATOR
export const fetchProducts = () => async dispatch => {
  const {data} = await axios.get('/api/products');
  console.log(data);
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
