const Yup = require('yup');
const Helpers = require('../helpers/Helpers');

class OrderValidation {

    async createOrder(req, res, next) {
        try {
            const schema = Yup.object().shape({
                symbol: Yup.string().required(Helpers.getMessage('required', ['Symbol'])).min(1, Helpers.getMessage('min', ['Symbol', 1])),
                quantity: Yup.number().required(Helpers.getMessage('required', ['Quantity'])).min(1, Helpers.getMessage('min', ['Quantity', 1])),
            });
            schema.validate(req.body, { abortEarly: false }).then((response) => {
                next();
            }).catch((err) => {
                next(err);
            });
        } catch (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
    }

    async updateOrder(req, res, next) {
        try {
            const schema = Yup.object().shape({
                order_id: Yup.string().required(Helpers.getMessage('required', ['Order Id'])),
                quantity: Yup.string().required(Helpers.getMessage('required', ['Quantity'])).min(1, Helpers.getMessage('min', ['Quantity', 1])),
                symbol: Yup.string().required(Helpers.getMessage('required', ['Symbol'])).min(1, Helpers.getMessage('min', ['Symbol', 1])),
            });
            schema.validate(req.body, { abortEarly: false }).then((response) => {
                next();
            }).catch((err) => {
                next(err);
            });
        } catch (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
    }

    async deleteOrder(req, res, next) {
        try {
            const schema = Yup.object().shape({
                identifier: Yup.string().required(Helpers.getMessage('required', ['Order Id'])),
            });
            schema.validate(req.body, { abortEarly: false }).then((response) => {
                next();
            }).catch((err) => {
                next(err);
            });
        } catch (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
    }
}
module.exports = new OrderValidation();