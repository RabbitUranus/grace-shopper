/* global describe beforeEach it */

const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));
const db = require('../index');
const Item = db.model('item');

describe('Item model', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('data input', () => {
    describe('name is required', () => {
      function noName() {
        return Item.build({
          name: '',
          category: 'watch',
          description: 'lorem ipsum',
          image: 'blah.png',
          price: 1.1
        });
      }

      it('throws error if name is empty', async () => {
        expect(await noName().validate).to.throw();
      });
    });
  });
  // end describe('name is required')

  describe('category is required', () => {
    function noCat() {
      return Item.build({
        name: 'grandfather',
        description: 'lorem ipsum',
        image: 'blah.png',
        price: 1.1
      });
    }

    it('throws error if category is missing', async () => {
      expect(await noCat().validate).to.throw();
    });
  }); // end describe('category is required')

  describe('image is required', () => {
    function noImg() {
      return Item.build({
        name: 'grandfather',
        category: 'watch',
        description: 'lorem ipsum',
        price: 1.1
      });
    }

    it('throws error if image is missing', async () => {
      expect(await noImg().validate).to.throw();
    });
  }); // end describe('image is required')

  describe('category is invalid', () => {
    function invalidCat() {
      return Item.build({
        name: 'grandfather',
        category: 'cat',
        description: 'lorem ipsum',
        image: 'blah.png',
        price: 1.1
      });
    }

    it('throws error if category is invalid', async () => {
      expect(await invalidCat().validate).to.throw();
    });
  }); // end describe('category is required')

  describe('price must exist', () => {
    let charlie;

    beforeEach(() => {
      charlie = Item.build({
        name: 'charlie',
        category: 'watch',
        description: 'lorem ipsum',
        image: 'blahblah.png'
      });
    });

    it('throws error if price is absent', async () => {
      let validationFailed = false;
      try {
        await charlie.validate();
      } catch (err) {
        validationFailed = true;
      }
      expect(validationFailed).to.eql(true);
    });
  }); // end describe('price must exist')

  describe('price must be positive', () => {
    let delta;

    beforeEach(() => {
      delta = Item.build({
        name: 'charlie',
        category: 'watch',
        description: 'lorem ipsum',
        image: 'blahblah.png',
        price: -0.01
      });
    });

    it('throws error if price is negative', async () => {
      let validationFailed = false;
      try {
        await delta.validate();
      } catch (err) {
        validationFailed = true;
      }
      expect(validationFailed).to.eql(true);
    }); // end describe('price must be positive')

    describe('passes when give good data', () => {
      function goodEntry() {
        return Item.build({
          name: 'grandfather',
          category: 'watch',
          description: 'lorem ipsum',
          image: 'blahblahblah.png',
          price: 1.1
        });
      }

      it('passes if data is valid', async () => {
        expect(await goodEntry()).to.be.an.instanceOf(Item);
      });
    }); // end describe('passes given good data')
  }); // end describe('data input')
}); // end describe('Item model')
