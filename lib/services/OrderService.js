import { sendSms } from '../utils/twilio.js';
import Order from '../models/Order.js';

export default class OrderService {
  static async create({ quantity }) {
    const order = await Order.insert({ quantity });
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );

    return order;
  }
  
  static async update({ id, quantity }) {
    const order = await Order.update({ id, quantity });
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order ${id} updated to ${quantity}`
    );

    return order;
  }

  static async delete(id) {
    const deletedOrder = await Order.delete(id);
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order ${id} has been cancelled`
    );

    return deletedOrder;
  }
}
