const express = require('express'),
    app = express(),
    port = process.env.PORT || 4000,
    bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');

// const token = jwt.sign({ id: 881, role: ["ADMIN","APPROVAL"] },'mocharfian')
// console.log(token)

app.use(((req, res, next) => {
    try{
        var tokenDecode = jwt.verify(req.headers.authorization,'mocharfian')
        next();
    }catch (e){
        res.statusCode = constants.UNAUTHORIZED_CODE;
        res.json(constants.UNAUTHORIZED_RESPONSE);
        res.end();
    }
}))

app.use(bodyParser.json());

var routes = require('./routes');
routes(app);

const constants = require("./helper/constants");

app.listen(port,()=>{
    console.log(`Aplikasi berjalan pada port : ${port}`)
});