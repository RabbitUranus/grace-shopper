import React from 'react';
import {Link} from 'react-router-dom';
// import watch from './watch';

export const MainPage = () => {
  console.log('here!');
  return (
    <div>
      <nav>
        <div>
          <Link to="/watches">Watches</Link>
        </div>
        <div>
          <img
            src="http://cdn.shopify.com/s/files/1/0377/2037/products/Rodeo_Side_1623d486-b650-47f6-befe-55e40d63edb7_1024x1024.progressive.jpg?v=1510688398"
          />
        </div>
        <div>
          <Link to="/rings">Rings</Link>
        </div>
        <div>
          <img
            src="http://image.brilliantearth.com/media/shape_images/07d7654fad40af0cfede43213c18c7bc_31879ec36695c01698749d8372166ff4_0_.jpg"
          />
        </div>
        <div>
          <Link to="/earrings">Earrings</Link>
        </div>
        <div>
          <img
            src="http://www.kendrascott.com/on/demandware.static/-/Sites-kendrascott/default/dw06196130/jewelry/signature/elle-earrings/842177017388_00_default_lg.jpg"
          />
        </div>
        <div>
          <Link to="/products">All products</Link>
        </div>
        <div>
          <img
            src="http://media.cleo.com.sg/2017/09/rose-gold-accessories-50.jpg"
          />
        </div>
      </nav>
    </div>
  );
};
