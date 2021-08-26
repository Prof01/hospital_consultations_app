const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret;

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    //Check for token
    if(!token) return res.status(401).json({ msg: 'No token, authorization denied' })

    try {
        //Verify token
        const decodedToken = jwt.verify(token, jwtSecret);
    
        //Add officer from payload
        req.user = decodedToken;
        next();
    } catch (err) {
        res.status(400).json({ msg: 'Invalid token' })
    }
}


module.exports = auth;