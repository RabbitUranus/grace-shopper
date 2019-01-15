import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Login,
  Signup,
  UserHome,
  Navbar,
  AllProducts,
  ThankYou,
  Category
} from './components';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import SingleItemDetail from './components/SingleItemDetail';
import {me} from './store';
import {MainPage} from './components/MainPage';
// import Category from './components/Category';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const {isLoggedIn} = this.props;

    return (
      <div>
        {/* <Route path="/api/*" render={() => <Redirect to="/" />} /> */}
        <Route path="/" component={Navbar} />
        <Route exact path="/" component={MainPage} />
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route path="/products/:id" component={SingleItemDetail} />

          <Route path="/products" component={AllProducts} />
          <Route
            exact
            path="/products/?category=:category"
            component={AllProducts}
          />

          <Route exact path="/cart" component={Cart} />
          <Route exact path="/cart/checkout" component={Checkout} />
          <Route exact path="/cart/checkout/thankyou" component={ThankYou} />

          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route exact path="/home" component={UserHome} />
            </Switch>
          )}
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Routes)
);

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
