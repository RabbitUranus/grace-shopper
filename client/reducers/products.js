import axios from 'axios'

//ACTION TYPE
const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'

//INITIAL STATE

const initialState = {products: []}

//ACTION CREATOR
export const requestProducts = products => ({
  type: REQUEST_PRODUCTS,
  payload: products
})

//THUNK CREATOR
export function fetchProducts() {
  return async function(dispatch) {
    const {data} = await axios.get('/api/products')
    dispatch(requestProducts(data))
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PRODUCTS:
      return action.payload
    default:
      return state
  }
}
