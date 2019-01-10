import React from 'react';

import {Navbar, AllProducts} from './components';
import Routes from './routes';

import {FilterNav} from './components/FilterNav';
import {MainPage} from './components/MainPage';
import {Checkout} from './components/Checkout';
import {Cart} from './components/Cart';

const App = () => {
  return (
    <div>
      <Routes />
      {/* <Navbar /> */}
      {/* <FilterNav /> */}
      {/* <AllProducts />
      <MainPage />
      <Checkout /> */}
    </div>
  );
};

export default App;
