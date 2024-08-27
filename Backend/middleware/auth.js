const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    let token = req.header('Authorization');
    console.log(token);
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        token = token.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("******",decoded);
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

exports.admin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied, admin only' });
    }
    next();
};





// const jwt = require("jsonwebtoken");
// // const user = require("../routes/userRoute");


// const auth = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
    
//     if (!authHeader) {
//       return res.status(401).json({ error: 'Authorization header is missing' });
//     }

//     const token = authHeader.split(' ')[1];
    
//     if (!token) {
//       return res.status(401).json({ error: 'Token is missing or malformed' });
//     }

//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decodedToken;
//     next();
//   } catch (error) {
//     console.error('Authorization error:', error);
//     res.status(401).json({ error: 'Invalid or expired token' });
//   }
// };

// module.exports = auth;

