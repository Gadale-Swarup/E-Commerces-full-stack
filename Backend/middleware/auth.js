const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Token is missing or malformed' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = auth;


// const jwt = require("jsonwebtoken");
// // const user = require("../routes/userRoute");

// const authorise = (req, res, next) => {
//   const token = req.header("Authorization");
//   const bearerword = token.split(" ")[0].trim();
//   const bearertoken = token.split(" ")[1];
//   if (bearerword != "Bearer") {
//     return res.status(401).send("Acess denied.Invalid token");
//   }
//   if (!bearertoken) {
//     return res.status(401).send("Acess denied. No token Provided");
//   }
//   try {
//     const decoded = jwt.verify(bearertoken, "key");
//     req.user = decoded.userId;
//     next();
//   } catch (error) {
//     res.status(401).send("Invalid token");
//   }
// };

// module.exports = authorise;