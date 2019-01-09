import React from 'react';
import {Link} from 'react-router-dom';

const dummyData = {
  name: 'Able Baker',
  address: '123 Main Street, Anytown, NY 12345'
};

export const Checkout = () => {
  return (
    <div>
      <div>
        <button type="button"> Checkout as Guest </button>
        <button type="button"> Log in </button>
      </div>
      <div>
        <h4>Personal Information</h4>
        <a>{dummyData.name}</a>
        <h4>Shipping Address</h4>
        <a>{dummyData.address}</a>
        <h4>Billing Address</h4>
        <a>{dummyData.address}</a>
      </div>
    </div>
  );
};
