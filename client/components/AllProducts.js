import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProducts} from '../reducers/products';
import SingleProductCard from './SingleProductCard';
import queryString from 'query-string';

export class AllProducts extends Component {
  componentDidMount() {
    let query;
    const values = queryString.parse(this.props.location.search);
    const category = values.category || '';
    if (!category) {
      query = '';
    } else {
      query = `?category=${category}`;
    }
    this.props.fetchProducts(query);
  }

  render() {
    const products = this.props.products;
    return (
      <div>
        <h1>All Products</h1>
        <div className="productsGrid">
          {this.props.products.length ? (
            products.map(product => (
              <SingleProductCard product={product} key={product.id} />
            ))
          ) : (
            <div />
          )}
        </div>
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
)(AllProducts);
