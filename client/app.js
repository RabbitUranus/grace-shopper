import React from 'react';

import {Navbar, AllProducts} from './components';
import Routes from './routes';

import {FilterNav} from './components/FilterNav';
import {MainPage} from './components/MainPage';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <FilterNav />
      <AllProducts />
      <MainPage />
    </div>
  );
};

export default App;
