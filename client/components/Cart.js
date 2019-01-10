import React from 'react';

export default class Cart extends React.Component {
  render() {
    console.log('hello');
    return (
      <table>
        <thead>
          <tr>
            <th>Items</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
      </table>
    );
  }
}
