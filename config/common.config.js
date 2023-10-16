const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    sensibull: {
        BASE_URL: process.env.SENSIBULL_API_URL,
    }
}