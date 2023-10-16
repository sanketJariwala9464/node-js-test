const Helpers = require('../../helpers/Helpers');
const OrderModel = require('../../models/order');
const SensibullService = require('../sensibull');

class OrderService {

    async getOrders(req, res, next) {
        try {
            const orders = await OrderModel.findAll({
                attributes: ['order_id', 'symbol', 'order_tag', 'filled_quantity', 'request_quantity', 'status']
            });
            return res.status(200).json({ success: true, message: Helpers.getMessage('fetch', ['Order']), payload: orders });
        } catch (err) {
            return res.status(500).json({ success: false, message: Helpers.getMessage('general_fail') });
        }
    }

    async getSingleOrder(req, res, next) {
        try {
            const order = await OrderModel.findOne({
                where: { order_id: req.params.id },
                attributes: ['order_id', 'symbol', 'order_tag', 'filled_quantity', 'request_quantity', 'status']
            });
            if (!order) {
                return res.status(404).json({ success: false, message: Helpers.getMessage('not_found', ['Order']) });
            }
            return res.status(200).json({ success: true, message: Helpers.getMessage('fetch', ['Order']), payload: order });
        } catch (err) {
            return res.status(500).json({ success: false, message: Helpers.getMessage('general_fail') });
        }
    }

    async createOrder(req, res, next) {
        try {
            const payload = { 
                symbol: req.body.symbol,
                quantity: +req.body.quantity, 
                order_tag: "yyyyyy" 
            };
            const service = new SensibullService();
            const createProductOnSensibull = await service.postOrder(payload);
            if (createProductOnSensibull.status !== 200 || !createProductOnSensibull.data.success) {
                return res.status(500).json({ success: false, message: Helpers.getMessage('general_fail') });
            }
            payload.order_id = createProductOnSensibull.data.payload.order.order_id;
            payload.filled_quantity = createProductOnSensibull.data.payload.order.filled_quantity;
            payload.request_quantity = createProductOnSensibull.data.payload.order.request_quantity;
            const order = await OrderModel.create(payload);
            if (!order) {
                await service.deleteOrder(payload.order_id);
                return res.status(500).json({ success: false, message: Helpers.getMessage('general_fail') });
            }
            delete order.dataValues.id;
            delete order.dataValues.createdAt;
            delete order.dataValues.updatedAt;
            return res.status(200).json({ success: true, message: Helpers.getMessage('insert', ['Order']), payload: order });
        } catch (err) {
            return res.status(500).json({ success: false, message: Helpers.getMessage('general_fail') });
        }
    }

    async updateOrder(req, res, next) {
        try {
            const payload = { 
                symbol: req.body.symbol,
                quantity: +req.body.quantity, 
                order_tag: "yyyyyy",
                order_id: req.body.order_id
            };
            const isExistOrder = await OrderModel.findOne({
                where: { order_id: payload.order_id },
            });
            if (!isExistOrder) {
                return res.status(404).json({ success: false, message: Helpers.getMessage('not_found', ['Order']) });
            }
            const service = new SensibullService();
            const updateOrderOnSensibull = await service.updateOrder(payload.order_id, payload);
            if (updateOrderOnSensibull.status !== 200 || !updateOrderOnSensibull.data.success) {
                return res.status(500).json({ success: false, message: Helpers.getMessage('general_fail') });
            }
            const updateOrder = await OrderModel.update(payload, { where: { order_id: payload.order_id } });
            if (!updateOrder) {
                return res.status(500).json({ success: false, message: Helpers.getMessage('general_fail') });
            }
            return res.status(200).json({ success: true, message: Helpers.getMessage('update', ['Order']) });
        } catch (err) {
            return res.status(500).json({ success: false, message: Helpers.getMessage('general_fail') });
        }
    }

    async deleteOrder(req, res, next) {
        try {
            const checkIsOrderExist = await OrderModel.findOne({ where: { order_id: req.body.identifier } });
            if (!checkIsOrderExist && checkIsOrderExist.status != 'open') {
                return res.status(404).json({ success: false, message: Helpers.getMessage('not_found', ['Order']) });
            }
            const service = new SensibullService();
            const deleteOrderOnSensibull = await service.deleteOrder(req.body.identifier);
            if (deleteOrderOnSensibull.status !== 200 || !deleteOrderOnSensibull.data.success) {
                return res.status(500).json({ success: false, message: Helpers.getMessage('general_fail') });
            }
            const cancelOrder = await OrderModel.update({ status: 'cancel' }, { where: { order_id: req.body.identifier } });
            if (!cancelOrder) {
                return res.status(500).json({ success: false, message: Helpers.getMessage('general_fail') });
            }
            return res.status(200).json({ success: true, message: Helpers.getMessage('cancel', ['Order']) });
        } catch (err) {
            return res.status(500).json({ success: false, message: Helpers.getMessage('general_fail') });
        }
    }

}
module.exports = new OrderService();