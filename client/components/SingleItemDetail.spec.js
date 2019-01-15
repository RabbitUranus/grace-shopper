/* global describe beforeEach it */

import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {SingleItemDetail} from './SingleItemDetail';
import sinon from 'sinon';

const adapter = new Adapter();
enzyme.configure({adapter});

describe('SingleItemDetail', () => {
  let singleItem;
  const fetchItem = sinon.spy();
  const match = {
    isExact: true,
    path: '/products/:id',
    url: '/products/11',
    params: {
      id: 11
    }
  };
  const testItem = {
    item: {
      id: 11,
      imageURL: 'images/watches/waiting-410328_1280.jpg',
      name: "Man's gold wristwatch",
      color: 'gold',
      price: 13000,
      category: 'watch',
      description:
        'Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna.'
    }
  };

  beforeEach(() => {
    singleItem = shallow(
      <SingleItemDetail item={testItem} match={match} fetchItem={fetchItem} />
    );
  });

  it('renders item name in an h2 component', () => {
    expect(singleItem.find('h2').text()).to.be.equal(testItem.item.name);
  });

  it('renders item description in a p component', () => {
    expect(singleItem.find('p').text()).to.be.equal(testItem.item.description);
  });
});
