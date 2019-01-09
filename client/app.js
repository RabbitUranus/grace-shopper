import React from 'react';

import {Navbar} from './components';
import Routes from './routes';
import {AllProducts} from './components/AllProducts';
import {FilterNav} from './components/FilterNav';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <FilterNav />
      <AllProducts />
    </div>
  );
};

export default App;
