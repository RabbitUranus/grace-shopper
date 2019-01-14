import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProduct} from '../reducers/cart';
import {Link} from 'react-router-dom';
import {displayPrice} from '../utils/utilities';

export class SingleProductCard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.fetchProduct(this.props.product.id);
  }

  render() {
    const {name, imageURL, price, id} = this.props.product;
    return (
      <div className="smallImage">
        <ul key={id}>
          <li>
            <Link to={`/products/${id}`}>{name}</Link>
          </li>
          <Link to={`/products/${id}`}>
            {' '}
            <img src={imageURL} />{' '}
          </Link>
          <li>{displayPrice(price)}</li>
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductCard);
