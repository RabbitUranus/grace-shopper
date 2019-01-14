import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProduct} from '../reducers/cart';
import {Link} from 'react-router-dom';

export class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.fetchProduct(this.props.product.id);
    // console.log('cart contains:', this.props.cart);
  }

  render() {
    // console.log('SingleProduct', this.props);
    const {name, description, image, price, id} = this.props.product;
    return (
      <div className="smallImage">
        <ul key={id}>
          <li>
            <Link to={`/products/${id}`}>{name}</Link>
          </li>
          <Link to={`/products/${id}`}>
            {' '}
            <img src={image} />{' '}
          </Link>
          <li>${price / 100}</li>
        </ul>
        <button type="submit" onClick={this.handleClick}>
          Add to Cart
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  products: state.products
});

const mapDispatchToProps = dispatch => ({
  fetchProduct: id => dispatch(fetchProduct(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProduct);
