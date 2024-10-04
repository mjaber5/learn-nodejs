const jwt = require('jsonwebtoken');

const verifyToken = (req , res , next)=>{
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];    
    const token = authHeader.split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log('DecodedToken',decodedToken);
    
    console.log('token', token);
    next();
    
}

module.exports = verifyToken;
