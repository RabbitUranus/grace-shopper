import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProduct} from '../reducers/cart';

export class SingleItemDetail extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
    console.log('SID props', this.props);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount = () => {
    this.setState({product: this.props.fetchProduct(this.id)});
  };
  handleClick() {
    this.props.fetchProduct(this.id);
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
  products: state.products,
  product: state.product
});

const mapDispatchToProps = dispatch => ({
  fetchProduct: id => dispatch(fetchProduct(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleItemDetail);
