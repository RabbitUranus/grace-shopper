import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {sendOrder} from '../reducers/cart';
import ThankYou from './ThankYou';
import {displayPrice} from '../utils/utilities';
import Cart from './Cart';

export class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isComplete: false,
      user: this.props.user
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    this.props.sendOrder({orders: this.props.cart, user: this.props.user});
    this.setState({isComplete: !this.state.isComplete});
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
        <div className="checkoutMain">
          <div className="checkoutInfoBox">
            {!this.state.isComplete && (
              <form>
                <br />
                <label className="categoryInfo">Billing Address:</label>
                <br />
                <label>
                  Full Name*:
                  <input
                    name="fullName"
                    type="text"
                    value={this.state.user.name}
                  />
                </label>

                <label>
                  Shipping Address 1*:
                  <input
                    name="address"
                    type="text"
                    value={this.state.user.address}
                  />
                </label>

                <label>
                  Shipping Address 2:
                  <input name="address" type="text" />
                </label>
                <label>
                  City*:
                  <input name="city" type="text" />
                </label>
                <label>
                  State*:
                  <input name="address" type="text" />
                </label>
                <label>
                  Zip Code*:
                  <input name="address" type="number" />
                </label>
                <br />
              </form>
            )}
          </div>

          <div className="checkoutInfoBox">
            {!this.state.isComplete && (
              <form>
                <br />
                <label className="categoryInfo">Shipping Address:</label>
                <br />
                <label>
                  Full Name*:
                  <input
                    name="fullName"
                    type="text"
                    value={this.state.user.name}
                  />
                </label>

                <label>
                  Shipping Address 1*:
                  <input
                    name="address"
                    type="text"
                    value={this.state.user.address}
                  />
                </label>

                <label>
                  Shipping Address 2:
                  <input name="address" type="text" />
                </label>
                <label>
                  City*:
                  <input name="city" type="text" />
                </label>
                <label>
                  State*:
                  <input name="address" type="text" />
                </label>
                <label>
                  Zip Code*:
                  <input name="address" type="number" />
                </label>
                <br />
              </form>
            )}
          </div>
        </div>
        {!this.state.isComplete && <hr />}
        <div className="checkoutMain">
          <div className="checkoutInfoBox">
            {!this.state.isComplete && (
              <form>
                <br />
                <label className="categoryInfo">Personal Information:</label>
                <br />
                <label>
                  Full Name:
                  <input
                    name="fullName"
                    type="text"
                    value={this.state.user.name}
                  />
                </label>

                <label>
                  Email:
                  <input
                    name="email"
                    type="text"
                    defaultValue={this.state.user.email}
                  />
                </label>

                <label>
                  Address:
                  <input
                    name="adress"
                    type="text"
                    defaultValue={this.state.user.address}
                  />
                </label>
                <br />
                <label className="categoryInfo">Payment Information:</label>
                <br />
                <label>
                  Credit Card Number:
                  <input name="creditCard" type="number" />
                </label>
                <label>
                  Card Validation Code (3 or 4 digit number):
                  <input name="code" type="number" />
                </label>
                <label>
                  Ex. Month:
                  <input name="exMonth" type="number" />
                </label>
                <label>
                  Ex. Year:
                  <input name="exYear" type="number" />
                </label>
              </form>
            )}
          </div>

          <div className="checkoutInfoBox">
            {!this.state.isComplete && (
              <table>
                <thead>
                  <Cart checkout={true} />

                  {!isLoggedIn ? (
                    <tr>
                      <th>
                        <button
                          type="button"
                          className="btn btn-outline-info"
                          onClick={this.handleSubmit}
                        >
                          Checkout as Guest using Stripe
                        </button>
                        <Link to="/login">
                          <button
                            type="button"
                            className="btn btn-outline-info"
                          >
                            Log in
                          </button>
                        </Link>
                      </th>
                    </tr>
                  ) : (
                    <tr>
                      <th>
                        <button
                          type="button"
                          className="btn btn-outline-info"
                          onClick={this.handleSubmit}
                        >
                          Place the order with Stripe
                        </button>
                      </th>
                    </tr>
                  )}
                </thead>
              </table>
            )}
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
