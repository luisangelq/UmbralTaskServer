const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    //Read token 
    const token = req.header("x-auth-token");

    console.log(token);
    //Check if there isnt token
    if(!token) {
        return res.status(401).json({ msg: "There isn't Token, Invalid Permission"})
    }

    //validate token
    try {
        const encrypted = jwt.verify(token, process.env.SECRET_KEY);
        req.user = encrypted.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Invalid Token"})
    }
}