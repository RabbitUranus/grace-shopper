import axios from 'axios';

//ACTION TYPE
export const GET_SINGLE_ITEM = 'GET_SINGLE_ITEM';

//ACTION CREATOR
export const getItem = item => ({type: GET_SINGLE_ITEM, item});

//THUNK CREATOR
export const fetchItem = id => async dispatch => {
  const {data} = await axios.get(`/api/products/${id}`);
  const action = getItem(data);
  dispatch(action);
};

//INITIAL STATE
export const defaultItem = {item: {}};

export default function cart(state = defaultItem, action) {
  const newState = {...state};
  switch (action.type) {
    case GET_SINGLE_ITEM:
      newState.item = action.item;
      return newState;
    default:
      return state;
  }
}
