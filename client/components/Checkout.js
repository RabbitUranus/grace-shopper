import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {sendOrder} from '../reducers/cart';

const dummyData = {
  name: 'Able Baker',
  address: '123 Main Street, Anytown, NY 12345'
};

export class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.loginRedirect = this.loginRedirect.bind(this);
  }
  componentDidMount() {
    this.props.sendOrder();
  }
  loginRedirect() {
    let path = `login`;
    this.props.history.push(path);
  }
  render() {
    console.log(this.props.cart);
    const isLoggedIn = false; // This must be linked to the state
    return (
      <table>
        <thead>
          <tr>
            <th>Personal Information</th>
            <th>{dummyData.name}</th>
          </tr>
          <tr>
            <th>Shipping and Billing Address</th>
            <th>{dummyData.address}</th>
          </tr>

          {isLoggedIn && (
            <tr>
              <th>
                <button>Checkout as Guest</button>
                <button onClick={this.loginRedirect}>Log in</button>
              </th>
            </tr>
          )}
          {!isLoggedIn && (
            <tr>
              <th>
                <button>Submit</button>
              </th>
            </tr>
          )}
        </thead>
      </table>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart.cart
});

const mapDispatchToProps = dispatch => ({
  sendOrder: order => dispatch(sendOrder(order))
});

export default connect(
  null,
  mapDispatchToProps
)(Checkout);
