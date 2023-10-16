const { CronJob } = require('cron');
const OrderModel = require('../models/order');
const SensibullService = require('../services/sensibull');

const job = new CronJob('*/15 * * * * *', async function () {
    console.log('You will see this message every 15 minutes');
    const orders = await OrderModel.findAll({
        where: { status: 'open' },
        attributes: ['order_id']
    });

    const orderIds = orders.map((order) => order.order_id);

    const service = new SensibullService();

    const orderStatus = await service.getOrderStatus({ order_ids: orderIds });

    console.log(orderStatus);

    if (orderStatus.status == 200 && orderStatus.data.success) {
        const orderStatusData = orderStatus.data.payload;
    
        for (const order of orderStatusData) {
            const orderToUpdate = await OrderModel.findOne({ where: { order_id: order.order_id } });
            if (!orderToUpdate) {
                continue;
            }
            orderToUpdate.filled_quantity = order.filled_quantity;
            orderToUpdate.status = order.status;
            await orderToUpdate.save();
        }
    }
});

module.exports = job;
