import React from 'react';
import {connect} from 'react-redux';

export class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.homeRedirect = this.homeRedirect.bind(this);
    this.checkoutRedirect = this.checkoutRedirect.bind(this);
  }
  homeRedirect() {
    let path = `products`;
    this.props.history.push(path);
  }
  checkoutRedirect() {
    let path = `cart/checkout`;
    this.props.history.push(path);
  }

  render() {
    console.log('props', this.props);
    console.log('cart', Array.isArray(this.props.cart));
    const {cart} = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Items</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          {cart &&
            cart.map(product => (
              <tr key={product.id}>
                <th>{product.name}</th>
                <th>{product.price}</th>
                <th>1</th>
                <th>{product.price}</th>
              </tr>
            ))}
        </thead>
        <th>
          <button onClick={this.homeRedirect}>Continue shopping</button>
        </th>
        <th>
          <button onClick={this.checkoutRedirect}>Checkout</button>
        </th>
      </table>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart.cart
});

export default connect(
  mapStateToProps,
  null
)(Cart);
