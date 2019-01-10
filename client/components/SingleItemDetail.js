import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProduct} from '../reducers/cart';

export class SingleItemDetail extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.product.id;
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.fetchProduct(this.props.product.id);
    const productId = this.props.product.id;
  }

  render() {
    console.log('SingleItemDetail', this.props);
    const {name, description, image, price} = this.props.product;
    return (
      <div>
        <h2>{name}</h2>
        <img src={image} />
        <h4>{price}</h4>
        <p>{description}</p>

        <button type="submit" onClick={this.handleClick}>
          Add to Cart
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  product: state.product
});

const mapDispatchToProps = dispatch => ({
  fetchProduct: id => dispatch(fetchProduct(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleItemDetail);
