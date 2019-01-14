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
export const fetchProduct = id => async dispatch => {
  const {data} = await axios.get(`/api/products/${id}`);
  const action = addProduct(data);
  dispatch(action);
};

export const sendOrder = ({orders, user}) => async dispatch => {
  const arrayOfIds = orders.map(el => {
    return el.id;
  });
  const arrayOfPrices = orders.map(el => {
    return el.price;
  });
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const total = arrayOfPrices.reduce(reducer, 0);

  const reqBody = {
    total,
    items: arrayOfIds,
    userId: user.id
  };

  await axios.post('/api/orders', reqBody);
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
