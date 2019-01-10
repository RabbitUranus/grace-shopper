import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchItem} from '../reducers/item';

export class SingleItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.id = +this.props.match.params.id;
    console.log('SID props', this.props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount = () => {
    console.log('in componentDidMount');
    this.setState({product: this.props.fetchItem(this.id)});
    console.log(this.state.product);
  };

  handleClick() {
    this.props.fetchItem(this.id);
  }

  render() {
    console.log('SingleItemDetail', this.props, this.id);
    const {name, description, image, price} = this.props.item.item;
    return (
      <div>
        <h1>YOU ARE HERE</h1>
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
  item: state.item
});

const mapDispatchToProps = dispatch => ({
  fetchItem: id => dispatch(fetchItem(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleItemDetail);
