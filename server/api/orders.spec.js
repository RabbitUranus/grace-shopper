/* global describe beforeEach it */

const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Order = db.model('order');

// describe('Order routes', () => {
//   beforeEach(() => {
//     // return db.sync({force: true});
//   });

//   describe('/api/orders/', () => {

//     beforeEach(done => {
//       done();

//     });

//     it('GET /api/orders', async () => {
//       const res = await request(app)
//         .get('/api/orders')
//         .set('user', 'isAdmin: true')
//         .expect(200);

//       expect(res.body).to.be.an('array');
//       expect(res.body[0].chargeId).to.be.equal('1');
//     });

//     it('POST /api/orders', async () => {
//       const data = {chargeId: 'hey', amount: 500, items: [1, 2]};
//       const res = await request(app)
//         .post('/api/orders/')
//         .send(data)
//         .expect(201);
//     });
//   });
// });
