const axios = require('axios');
const commonConfig = require('../../config/common.config');
const uuid = require('uuid');

class SensibullService {
    constructor() {
        this.initAxios();
    }

    async initAxios() {
        this.axios = axios.create({
            baseURL: commonConfig.sensibull.BASE_URL,
            headers: {
                'X-AUTH-TOKEN': 'b32f8719005942699f75b15924019ab0'
            },
        });
    }

    async postOrder(payload) {
        try {
            return this.axios.post('/order/place', payload);
        } catch (err) {
            throw err;
        }
    }

    async getOrderStatus(payload) {
        try {
            return this.axios.post('/order/status-for-ids', payload);
        } catch (err) {
            throw err;
        }
    }

    async updateOrder(order_id, payload) {
        try {
            return this.axios.put(`/order/${order_id}`, payload);
        } catch (err) {
            throw err;
        }
    }

    async deleteOrder(order_id) {
        try {
            return this.axios.delete(`/order/${order_id}`);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = SensibullService;