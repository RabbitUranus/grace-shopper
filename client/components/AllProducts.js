import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProducts} from '../reducers/products';

import SingleProduct from './SingleProduct';

import axios from 'axios';

const dummyData = {
  name: 'watch',
  description: 'nice watch',
  price: 50,
  image: 'abc'
};

export class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/products');
    this.setState = {
      products: data
    };
    console.log('componentDidMount', data);
    this.render();
    // this.props.fetchProducts();
  }
  // async componentDidUpdate() {
  //   const {data} = await axios.get('/api/products');
  //   this.setState = {
  //     products: data
  //   };
  //   console.log('componentDidUpdate', data);
  //   // this.render();
  //   // this.props.fetchProducts();
  // }
  render() {
    const products = this.state.products || [];
    console.log('render', this.state.products);
    return (
      <div>
        <h1>All Products</h1>
        {/* <SingleProduct product={dummyData} /> */}
        {this.state.products.map(product => (
          <SingleProduct product={product} />
        ))}
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
