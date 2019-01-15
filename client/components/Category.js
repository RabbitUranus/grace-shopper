import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProducts} from '../reducers/products';
import SingleProduct from './SingleProduct';

export class Category extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchProducts(this.props.query || '');
  }
  render() {
    console.log(this.props);
    const products = this.props.products;
    return (
      <div>
        <h1>All Products</h1>
        {this.props.products.length ? (
          products.map(product => (
            <SingleProduct product={product} key={product.id} />
          ))
        ) : (
          <div />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

const mapDispatchToProps = dispatch => ({
  fetchProducts: query => dispatch(fetchProducts(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
