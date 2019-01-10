import React from 'react';

export class Cart extends React.Component {
  render() {
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
