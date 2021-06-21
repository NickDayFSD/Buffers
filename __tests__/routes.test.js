import request from 'supertest';

import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import app from '../lib/app.js';

// import Order from '../lib/models/Order.js';


describe('service routes', () => {
  beforeEach(async () => {
    return setup(pool);
  });

  test('creates a new order in our database and send a text message notification', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });

    expect(res.body).toEqual({ id: '1', quantity: 10 });
  });
});
