const messages = require('../lang/en.json');

module.exports = {
    getMessage: (key, array_value = []) => {
        try {
            const message = messages[key];
            if (key && array_value.length > 0) {
                let response = '';
                array_value.forEach((value, index) => {
                    response = message.replace(`:${index}`, value);
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