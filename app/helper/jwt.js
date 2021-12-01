const jwt = require('jsonwebtoken');
const JWT_SECRET_TOKEN = process.env.JWT_SECRET_KEY;



generateToken = (data, cb) => {
    return jwt.sign({ data }, JWT_SECRET_TOKEN);
};

verifyToken = (token, cb) => {
    try {
        let data = jwt.verify(token, JWT_SECRET_TOKEN);
        cb(null, data);
    } catch (error) {
        cb(error, null);
    }
};
validateToken = async (req, res, next) => {
    let token = req.headers['authorization'];
    if (token && typeof token !== 'undefined') {
        verifyToken(token, async (err, data) => {
            if (err) {
                res.json("Invalid token");
            }
            req.token = token;
            req.authData = data;
            next();
        });
    } else {    
        res.json("Invalid token");
    }

};

module.exports = {
    generateToken,
    verifyToken,
    validateToken
}