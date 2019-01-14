import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {sendOrder} from '../reducers/cart';
import ThankYou from './ThankYou';

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
    this.guestRedirect = this.guestRedirect.bind(this);
  }
  handleSubmit() {
    this.props.sendOrder({orders: this.props.cart, user: this.props.user});
    this.setState({isComplete: !this.state.isComplete});
  }
  loginRedirect() {
    let path = `login`;
    this.props.history.push(path);
  }
  guestRedirect() {
    let path = 'checkout-as-guest';
    this.props.history.push(path);
  }

  render() {
    const {cart, user} = this.props;
    const isLoggedIn = !!user.id; // This must be linked to the state
    console.log(isLoggedIn);

    return (
      <div>
        {!this.state.isComplete && (
          <form>
            <label>Personal Information:</label>
            <br />
            <label>
              Full Name:
              <input
                name="fullName"
                type="text"
                value={this.state.user.name}
                onChange={this.handleInputChange}
              />
            </label>

            <label>
              Email:
              <input
                name="email"
                type="text"
                value={this.state.user.email}
                onChange={this.handleInputChange}
              />
            </label>
          </form>
        )}

        {!this.state.isComplete && (
          <table>
            <thead>
              <tr>
                <th>Personal Information</th>
              </tr>
              <tr>
                <td>Name: {user.name}</td>
              </tr>
              <tr>
                <td>Email: {user.email}</td>
              </tr>
              <tr>
                <th>Shipping and Billing Address</th>
              </tr>
              <tr>
                <td>Address: {user.address || '5 Hanover Sq. New York, NY'}</td>
              </tr>
              <tr>
                <th>Your order</th>
              </tr>
              {cart &&
                cart.map(product => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>1</td>
                    <td>{product.price}</td>
                  </tr>
                ))}

              {!isLoggedIn && (
                <tr>
                  <th>
                    <button onClick={this.guestRedirect}>
                      Checkout as Guest
                    </button>
                    <button onClick={this.loginRedirect}>Log in</button>
                  </th>
                </tr>
              )}
              {isLoggedIn && (
                <tr>
                  <th>
                    <button onClick={this.handleSubmit}>Complete</button>
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
