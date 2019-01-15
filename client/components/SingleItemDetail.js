import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchItem} from '../reducers/item';
import {fetchProduct} from '../reducers/cart';

export class SingleItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.id = +this.props.match.params.id;
    this.handleClick = this.handleClick.bind(this);
    this.addCart = this.addCart.bind(this);
  }

  componentDidMount = () => {
    //CG: Out of control component!
    this.setState({product: this.props.fetchItem(this.id)});
  };

  handleClick() {
    this.props.fetchItem(this.id);
  }
  addCart() {
    this.props.fetchProduct(this.id); //CG: addProductToCart
  }

  render() {
    const {name, description, image, price} = this.props.item.item;
    return (
      <div className="detailedImage">
        <h2>{name}</h2>
        {/* CG: Note that the ../ means your are statically */}
        <img src={`/${image}`} />
        <h4>${price / 100}</h4>
        {/* CG: You may want to think about some number formatting utility. */}
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
  fetchProduct: id => dispatch(fetchProduct(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleItemDetail);
