/* global describe beforeEach it */

const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Order = db.model('order');
const User = db.model('user');
const Item = db.model('item');

describe('Order routes', () => {
  let adminAgent;
  after(() => {
    return db.sync({force: true});
  });

  describe('/api/orders/', () => {
    before(async () => {
      await Item.bulkCreate([
        {
          name: 'first item',
          category: 'watch',
          imageURL: 'blah.png',
          price: 100
        },
        {
          name: 'second item',
          category: 'watch',
          imageURL: 'blah2.png',
          price: 150
        }
      ]);
      await Order.create({total: 500, items: [1, 2]});
      const {email} = await User.create({
        name: 'Super User',
        email: 'super@user.com',
        password: 'golfIsFun',
        isAdmin: true
      });
      adminAgent = request.agent(app);
      await adminAgent.post('/auth/login').send({
        email,
        password: 'golfIsFun'
      });
    });

    it('GET /api/orders works for an admin user', async () => {
      const res = await adminAgent.get('/api/orders').expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body[0].chargeId).to.be.equal('Not Charged');
    });

    it('GET /api/orders returns 401 for non-admin users', async () => {
      const normalUser = request.agent(app);
      const res = await normalUser.get('/api/orders');
      expect(res.status).to.be.equal(401);
    });

    it('POST /api/orders', async () => {
      const data = {chargeId: 'hey', amount: 500, items: [1, 2]};
      await request(app)
        .post('/api/orders/')
        .send(data)
        .expect(201);
    });
  });
});
