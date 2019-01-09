import React from 'react';

import {Navbar} from './components';
import Routes from './routes';
import {AllProducts} from './components/AllProducts';
import {MainPage} from './components/MainPage';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <AllProducts />
      <MainPage />
    </div>
  );
};

export default App;
