const express = require('express');
const app = express();
const port = 1111;

// middleware for parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//require mongoose
const db = require('./config/mongoose');

// use express router
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log('Error in running the server: ', err);
        return;
    }
    console.log('Server is running on port: ', port);
});