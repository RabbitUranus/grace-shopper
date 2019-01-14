/* global describe beforeEach it */

import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {SingleProduct} from './SingleProduct';
import sinon from 'sinon';

const adapter = new Adapter();
enzyme.configure({adapter});

describe('SingleProduct', () => {
  let singleProduct;
  const testItem = {
    image: 'images/watches/waiting-410328_1280.jpg',
    name: "Man's gold wristwatch",
    color: 'gold',
    price: 13000,
    category: 'watch',
    description:
      'Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna.'
  };

  beforeEach(() => {
    singleProduct = shallow(<SingleProduct product={testItem} />);
  });

  it('renders each product in an unordered list component', () => {
    expect(singleProduct.find('ul')).to.have.lengthOf(1);
  });

  it('has at least one "Link" component', () => {
    expect(singleProduct.find('Link')).to.have.lengthOf(2);
  });

  // it('simulates click events', () => {
  //   const onClick = sinon.spy();
  //   const wrapper = shallow(<SingleProduct onClick={onClick} />);
  //   wrapper.find('button').simulate('click');
  //   expect(onClick).to.have.property('callCount', 1);
  // });
});
