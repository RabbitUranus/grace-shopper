import React from 'react';
import {Link} from 'react-router-dom';

const dummyData = {
  name: 'Able Baker',
  address: '123 Main Street, Anytown, NY 12345'
};

export class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.loginRedirect = this.loginRedirect.bind(this);
  }
  loginRedirect() {
    let path = `login`;
    this.props.history.push(path);
  }
  render() {
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
