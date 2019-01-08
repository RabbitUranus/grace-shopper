import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProducts} from '../reducers/products';

import SingleProduct from './SingleProduct';

const dummyData = {
  name: 'watch',
  description: 'nice watch',
  price: 50,
  image: 'abc'
};

export class AllProducts extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    // this.props.fetchProducts();
  }
  render() {
    // const products = this.props.products;
    return (
      <div>
        <h1>All Products</h1>
        <SingleProduct product={dummyData} />
        {/* {products.map(product => <SingleProduct product={product} />)} */}
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
