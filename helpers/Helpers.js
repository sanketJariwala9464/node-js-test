const messages = require('../lang/en.json');

module.exports = {
    getMessage: (key, array_value = []) => {
        try {
            let message = messages[key];
            if (key && array_value.length > 0) {
                let response = message;
                array_value.forEach((value, index) => {
                    response = response.replace(new RegExp(`:${index}`, 'g'), value);
                });
                return response;
            } else {
                return message;
            }
        } catch (err) {
            return err.message;
        }
    },
}