import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchItem} from '../reducers/item';
import {fetchProduct} from '../reducers/cart';
import {displayPrice} from '../utils/utilities';
import {addToCart} from '../reducers/cart';

export class SingleItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.id = +this.props.match.params.id;
    this.handleClick = this.handleClick.bind(this);
    this.addCart = this.addCart.bind(this);
  }

  componentDidMount = () => {
    this.setState({product: this.props.fetchItem(this.id)});
  };

  handleClick() {
    this.props.fetchItem(this.id);
  }
  addCart() {
    this.props.addToCart(this.id);
  }

  render() {
    const {name, description, imageURL, price} = this.props.item.item;
    return (
      <div className="detailedImage">
        <h2>{name}</h2>
        <img src={imageURL} />
        <h4>{displayPrice(price)}</h4>
        <p>{description}</p>

        <button type="submit" onClick={this.addCart}>
          Add to Cart
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  products: state.products,
  item: state.item
});

const mapDispatchToProps = dispatch => ({
  fetchItem: id => dispatch(fetchItem(id)),
  addToCart: id => dispatch(addToCart(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleItemDetail);
