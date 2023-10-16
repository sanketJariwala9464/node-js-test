const { OrderService } = require('../../services');
const Helpers = require('../../helpers/Helpers');

class OrderController {

    async getOrders(req, res, next) {
        try {
            await OrderService.getOrders(req, res, next);
        } catch (err) {
            return res.status(500).json({ success: false, message: Helpers.getMessage('general_fail') });
        }
    }

    async getSingleOrder(req, res, next) {
        try {
            await OrderService.getSingleOrder(req, res, next);
        } catch (err) {
            return res.status(500).json({ success: false, message: Helpers.getMessage('general_fail') });
        }
    }

    async createOrder(req, res, next) {
        try {
            await OrderService.createOrder(req, res, next);
        } catch (err) {
            return res.status(500).json({ success: false, message: Helpers.getMessage('general_fail') });
        }
    }

    async updateOrder(req, res, next) {
        try {
            await OrderService.updateOrder(req, res, next);
        } catch (err) {
            return res.status(500).json({ success: false, message: Helpers.getMessage('general_fail') });
        }
    }

    async deleteOrder(req, res, next) {
        try {
            await OrderService.deleteOrder(req, res, next);
        } catch (err) {
            return res.status(500).json({ success: false, message: Helpers.getMessage('general_fail') });
        }
    }

}
module.exports = new OrderController();