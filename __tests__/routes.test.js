import request from 'supertest';
import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';

import app from '../lib/app.js';
import Order from '../lib/models/Order.js';


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

  test('gets an order by id via GET', async () => {
    const order = await Order.insert({ quantity: 2 });

    return request(app)
      .get(`/api/v1/orders/${order.id}`)
      .then((res) => {
        expect(res.body).toEqual(order);
      });
  });

  test('updates an order by id via PUT', async () => {
    const order = await Order.insert({ quantity: 2 });

    order.quantity = 5;

    return request(app)
      .put(`/api/v1/orders/${order.id}`)
      .send(order)
      .then((res) => {
        expect(res.body).toEqual(order);
      });
  });

  test('deletes an order by id via DELETE', async () => {
    const order = await Order.insert({ quantity: 9 });

    return request(app)
      .delete(`/api/v1/orders/${order.id}`)
      .then((res) => {
        expect(res.body).toEqual(order);
      });
  });
});
