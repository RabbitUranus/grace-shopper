/* global describe beforeEach it */

import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ThankYou from './ThankYou';

const adapter = new Adapter();
enzyme.configure({adapter});

describe('Thank You page', () => {
  let thankYou;

  beforeEach(() => {
    thankYou = shallow(<ThankYou />);
  });

  it('renders constant "Thank You" text in an h1', () => {
    expect(thankYou.find('h1').text()).to.be.equal(
      'Thank you, your order has been placed.'
    );
  });
});
