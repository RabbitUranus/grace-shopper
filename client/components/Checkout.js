import React from 'react';
import {Link} from 'react-router-dom';

const dummyData = {
  name: 'Able Baker',
  address: '123 Main Street, Anytown, NY 12345'
};

export class Checkout extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
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

          <tr>
            <th>
              <button onClick={this.homeRedirect}>Checkout as Guest</button>
            </th>
          </tr>
          <tr>
            <th>
              <button onClick={this.checkoutRedirect}>Log in</button>
            </th>
          </tr>
        </thead>
      </table>
    );
  }
}
