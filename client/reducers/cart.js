import axios from 'axios';

//ACTION TYPE
export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const SUBMIT_ORDER = 'SUBMIT_ORDER';

//ACTION CREATOR
export const addProduct = product => ({
  type: ADD_PRODUCT_TO_CART,
  product
});
export const submitOrder = () => ({
  type: SUBMIT_ORDER
});

//THUNK CREATOR
export const addToCart = (id, userId) => async dispatch => {
  console.log('in addtocart cart.js');
  const {data} = await axios.get(`/api/products/${id}`);
  const reqBody = {
    itemId: id,
    userId: userId
  };
  await axios.post(`/api/users/${userId}/orders`, reqBody);

  const action = addProduct(data);
  console.log('in addtocart thunk, action is', action);
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
  console.log('sendorder');
  await axios.put('/api/orders', reqBody);
  const action = submitOrder();
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
    default:
      return state;
  }
}
