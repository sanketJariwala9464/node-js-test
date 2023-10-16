const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const Helpers = require('./helpers/Helpers');
const orderJob = require('./jobs');

const app = express();

app.use(express.json())

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

// error handler
app.use(function (err, req, res, next) {
    res.status(400).json({ status: false, message: Helpers.getMessage('general_fail'), errors: err.errors });
});

app.listen(19093, () => {
    console.log(`Server is running on port: 19093`);
    orderJob.start();
})