import React, {Component} from 'react';

const SingleProduct = props => {
  const {name, description, image, price} = props.product;
  return (
    <div>
      <ul>
        <li>{name}</li>
        <li>{description}</li>
        <img src={image} />
        <li>{price}</li>
      </ul>
      <button type="submit">Add to Cart</button>
    </div>
  );
};

export default SingleProduct;
