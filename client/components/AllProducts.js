import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProducts} from '../reducers/products';

import SingleProductCard from './SingleProductCard';

export class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const products = this.props.products;
    return (
      <div>
        <h1>All Products</h1>
        {this.props.products.length ? (
          products.map(product => (
            <SingleProductCard product={product} key={product.id} />
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
  fetchProducts: () => dispatch(fetchProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
