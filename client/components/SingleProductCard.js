import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addToCart} from '../reducers/cart';
import {Link} from 'react-router-dom';
import {displayPrice} from '../utils/utilities';

export class SingleProductCard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.addToCart(this.props.product.id, this.props.user.id);
    alert('Item successfully added to Cart');
  }

  render() {
    const {name, imageURL, price, id} = this.props.product;
    return (
      <div className="productsRow">
        <ul key={id}>
          <li>
            <Link to={`/products/${id}`}>{name}</Link>
          </li>
          <Link to={`/products/${id}`}>
            <img src={imageURL} />
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
  products: state.products,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  addToCart: (id, userId) => dispatch(addToCart(id, userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductCard);
