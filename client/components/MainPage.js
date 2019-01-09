import React from 'react';
// import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

export const MainPage = () => {
  return (
    <div>
      <nav>
        <div>
          <Link to="/watches">Watches</Link>
        </div>
        <div>
          <Link to="/rings">Rings</Link>
        </div>
        <div>
          <Link to="/earrings">Earrings</Link>
        </div>
        <div>
          <Link to="/products">All products</Link>
        </div>
      </nav>
    </div>
  );
};
