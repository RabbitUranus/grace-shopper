import axios from 'axios';

//ACTION TYPE
export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';

//ACTION CREATOR
export const addProduct = product => ({
  type: ADD_PRODUCT_TO_CART,
  product
});

//THUNK CREATOR
export const fetchProduct = id => async dispatch => {
  const {data} = await axios.get(`/api/products/${id}`);
  const action = addProduct(data);
  dispatch(action);
};

//INITIAL STATE
export const defaultCart = {cart: []};

export default function cart(state = defaultCart, action) {
  const newState = {...state};
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      newState.cart = [...newState.cart, action.product];
      return newState;
    default:
      return state;
  }
}
