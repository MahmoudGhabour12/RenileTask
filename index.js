const express = require('express')
require('./src/db/mongoose')
const cors = require('cors')
const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
const user = require('./src/routers/user')
const devices = require('./src/routers/devices')
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", false);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
    res.header(
        "Access-Control-Allow-Headers",
        "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );
    if ("OPTIONS" == req.method) {
        res.send(200);
    } else {
        next();
    }
});
//call the routes to work
app.use(user)
app.use(devices)

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
