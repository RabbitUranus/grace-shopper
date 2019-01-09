/* global describe beforeEach it */

const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));
const db = require('../index');
const Item = db.model('item');
const User = db.model('user');
const Order = db.model('order');

describe('Order model', () => {
  beforeEach(() => {
    return async () => {
      db.sync({force: true});
      await User.create({
        name: 'carl',
        email: 'nobody3@example.com',
        address: 'lorem ipsum'
      });
    };
  });

  describe('creates orders sucessfully', () => {
    function withUser() {
      return Order.build({
        chargeId: '1',
        amount: 500,
        items: [1, 2],
        userId: User.findOne({where: {name: 'carl'}})
      });
    }

    it('accepts an order that has a valid user', async () => {
      expect(await withUser()).to.be.an.instanceOf(Order);
    });
    function withoutUser() {
      return Order.build({
        chargeId: '1',
        amount: 500,
        items: [1, 2]
      });
    }

    it('accepts an order that has no value for user', async () => {
      expect(await withoutUser()).to.be.an.instanceOf(Order);
    });
  });

  describe('cart cannot be empty', () => {
    function noCart() {
      return Order.build({
        chargeId: '1',
        amount: 500
      });
    }

    it('throws error if cart is undefined', async () => {
      expect(await noCart().validate).to.throw();
    });

    function emptyCart() {
      return Order.build({
        chargeId: '1',
        amount: 500
      });
    }

    it('throws error if cart is empty', async () => {
      expect(await emptyCart().validate).to.throw();
    });
  });

  describe('amount must be greater than 0', () => {
    function zeroPrice() {
      return Order.build({
        chargeId: '1',
        amount: 0,
        items: [0]
      });
    }

    it('throws error if amount is 0', async () => {
      expect(await zeroPrice().validate).to.throw();
    });

    function badPrice() {
      return Order.build({
        chargeId: '1',
        amount: 'hello',
        items: [0]
      });
    }

    it('throws error if amount is NaN', async () => {
      expect(await badPrice().validate).to.throw();
    });
  });

  //will not create an order with an amount <= 0
});
