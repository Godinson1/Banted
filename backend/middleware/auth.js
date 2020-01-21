const config = require('config');
const jwt = require('jsonwebtoken');
let User = require('../models/userModels');


const auth = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) return res.status(401).json({ msg: "Sorry, No Authorization!" });

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded;
       // console.log(decoded)
        User.find()
            .then(data => {
                req.user.username = data[0].username;
            });
        next();
    } catch(e) {
         res.status(400).json({ msg: "Invalid Token" });
    }
    
}

module.exports = auth;