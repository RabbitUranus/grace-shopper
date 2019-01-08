/* global describe beforeEach it */

const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));
const db = require('../index');
const User = db.model('user');

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('data input', () => {
    describe('name must exist', () => {
      function noName() {
        return User.build({
          email: 'nobody@example.com',
          address: 'lorem ipsum'
        });
      }

      it('throws error if name is missing', async () => {
        expect(await noName().validate).to.throw();
      });
    });

    describe('name must not be empty', () => {
      function emptyName() {
        return User.build({
          name: '',
          email: 'nobody1@example.com',
          address: 'lorem ipsum'
        });
      }
      it('throws error if name is empty', async () => {
        expect(await emptyName().validate).to.throw();
      });
    });

    describe('email must exist', () => {
      function noEmail() {
        return User.build({
          name: 'Andy',
          address: 'lorem ipsum'
        });
      }

      it('throws error if email is missing', async () => {
        expect(await noEmail().validate).to.throw();
      });
    });

    describe('email must be valid', () => {
      function invalidEmail() {
        return User.build({
          name: 'bob',
          email: 'nobody2',
          address: 'lorem ipsum'
        });
      }
      it('throws error if email is invalid', async () => {
        expect(await invalidEmail().validate).to.throw();
      });
    });

    describe('should pass given valid input', () => {
      function goodData() {
        return User.build({
          name: 'carl',
          email: 'nobody3@example.com',
          address: 'lorem ipsum'
        });
      }
      it('passes if given valid data', async () => {
        expect(await goodData()).to.be.an.instanceOf(User);
      });
    });
  }); // end describe('data input')

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody;

      beforeEach(async () => {
        cody = await User.create({
          name: 'cody',
          email: 'cody@puppybook.com',
          password: 'bones'
        });
      });

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true);
      });

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false);
      });
    }); // end describe('correctPassword')
  }); // end describe('instanceMethods')
}); // end describe('User model')
