import axios from 'axios';

//ACTION TYPE
export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const SUBMIT_ORDER = 'SUBMIT_ORDER';
export const LOAD_CART = 'LOAD_CART';

//ACTION CREATOR
export const addProduct = product => ({
  type: ADD_PRODUCT_TO_CART,
  product
});
export const submitOrder = () => ({
  type: SUBMIT_ORDER
});
export const loadCart = cart => ({
  type: LOAD_CART,
  cart
});

//THUNK CREATOR
export const addToCart = (id, userId) => async dispatch => {
  const {data} = await axios.get(`/api/products/${id}`);
  const reqBody = {
    itemId: id,
    userId: userId
  };
  await axios.post(`/api/users/${userId}/orders`, reqBody);

  const action = addProduct(data);
  dispatch(action);
};

export const sendOrder = ({orders, user}) => async dispatch => {
  const arrayOfIds = orders.map(el => {
    return el.id;
  });

  const reqBody = {
    items: arrayOfIds,
    userId: user.id
  };
  await axios.put('/api/orders', reqBody);
  const action = submitOrder();
  dispatch(action);
};

export const loadOrder = ({user}) => async dispatch => {
  const userCart = await axios.get(`/api/orders/${user.id}`);
  console.log('loadorder', userCart);
  const action = loadCart(userCart);
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
    case SUBMIT_ORDER:
      newState.cart = [];
      return newState;
    case LOAD_CART:
      newState.cart = action.cart;
    default:
      return state;
  }
}
