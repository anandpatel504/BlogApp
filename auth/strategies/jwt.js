const jwt = require('jsonwebtoken');

// UserInfo will be in this form { email: "my cool @email" }
function generateAccessToken(userInfo) {
    const {id, name, email} = userInfo;
    // token expiration  {1 hour}
    return jwt.sign({ id, name, email }, process.env.SECRET_KEY, { expiresIn: '2h' });
}

function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    var authHeader = req.query.token || req.body.token || req.headers.cookie;
    var token = authHeader && authHeader.split(' ')[0]
    if (token == undefined) {
        res.send({"error": "token not found!"})
        next()
    }
    try {
        if (token.startsWith('key=')) {
            token = token.slice(4, token.length);
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            req.decode = decoded;
            next(); // pass the execution off to whatever request the client intended
        }

    } catch (error) {
        console.log(error,"This is token error, please check it");
        req.Error =error.message
        next()        
    }
}

module.exports = { generateAccessToken, authenticateToken };
