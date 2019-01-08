import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../reducers/products'

export class AllProducts extends Component {
  // componentDidMount(){
  //   this.props.fetchProducts()
  // }
  render() {
    // const products = this.props.products;
    return (
      <div>
        <h1>All Products</h1>
        <h3>helloo hello testing </h3>
        {/* {products.map(product => (

  ))} */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
