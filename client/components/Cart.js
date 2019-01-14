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
    const {cart} = this.props;
    const arrayOfPrices = this.props.cart.map(el => {
      return el.price;
    });
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const total = arrayOfPrices.reduce(reducer, 0);

    return (
      <table>
        <thead>
          <tr>
            <th>Items</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
          {cart &&
            cart.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>1</td>
              </tr>
            ))}
          <tr>
            <th>Total: {total}</th>
          </tr>
          <tr>
            <th>
              <button onClick={this.homeRedirect}>Continue shopping</button>
            </th>
            <th>
              <button onClick={this.checkoutRedirect}>Checkout</button>
            </th>
          </tr>
        </thead>
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
