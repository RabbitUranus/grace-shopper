import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {sendOrder} from '../reducers/cart';
import ThankYou from './ThankYou';
import {displayPrice} from '../utils/utilities';

const dummyData = {
  name: 'Able Baker',
  address: '123 Main Street, Anytown, NY 12345'
};

export class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isComplete: false,
      user: this.props.user
    };
    this.loginRedirect = this.loginRedirect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    this.props.sendOrder({orders: this.props.cart, user: this.props.user});
    this.setState({isComplete: !this.state.isComplete});
  }
  loginRedirect() {
    let path = `login`;
    this.props.history.push(path);
  }

  render() {
    const {cart, user} = this.props;

    const arrayOfPrices = this.props.cart.map(el => {
      return el.price;
    });
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const total = arrayOfPrices.reduce(reducer, 0);
    const isLoggedIn = !!user.id;

    return (
      <div>
        {!this.state.isComplete && (
          <form>
            <label>Personal Information:</label>
            <br />
            <label>
              Full Name:
              <input name="fullName" type="text" value={this.state.user.name} />
            </label>

            <label>
              Email:
              <input name="email" type="text" value={this.state.user.email} />
            </label>

            <label>
              Address:
              <input
                name="adress"
                type="text"
                value={this.state.user.address}
              />
            </label>
          </form>
        )}

        {!this.state.isComplete && (
          <table>
            <thead>
              <tr>
                <th>Your order</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
              {cart &&
                cart.map(product => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{displayPrice(product.price)}</td>
                    <td>1</td>
                  </tr>
                ))}
              <tr>
                <th>Total: {displayPrice(total)}</th>
              </tr>

              {!isLoggedIn ? (
                <tr>
                  <th>
                    <button onClick={this.handleSubmit}>
                      Checkout as Guest using Stripe
                    </button>
                    <button onClick={this.loginRedirect}>Log in</button>
                  </th>
                </tr>
              ) : (
                <tr>
                  <th>
                    <button onClick={this.handleSubmit}>
                      Complete with Stripe
                    </button>
                  </th>
                </tr>
              )}
            </thead>
          </table>
        )}
        {this.state.isComplete && <ThankYou />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart.cart,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  sendOrder: order => dispatch(sendOrder(order))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
