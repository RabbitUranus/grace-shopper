import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProduct} from '../reducers/cart';

export class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    this.props.fetchProduct(this.props.product.id);
    console.log('cart contains:', this.props.cart);
  }

  render() {
    console.log('SingleProduct', this.props);
    const {name, description, image, price} = this.props.product;
    return (
      <div>
        <ul>
          <li>{name}</li>
          <li>{description}</li>
          <img src={image} />
          <li>{price}</li>
        </ul>
        <button type="submit" onSubmit={this.handleSubmit}>
          Add to Cart
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

const mapDispatchToProps = dispatch => ({
  fetchProduct: id => dispatch(fetchProduct(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProduct);
