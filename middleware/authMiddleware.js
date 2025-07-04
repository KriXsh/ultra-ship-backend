'use strict';

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['Authorization']?.split(' ')[1]; // Bearer YOUR_JWT_TOKEN
    console.log('Authorization header:', req.headers['Authorization']);

  if (!token) {
    console.log('No token provided');
    return res.status(403).json({ message: 'No token provided' }); // 403 Forbidden
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     console.log('Decoded JWT:', decoded);
    req.user = decoded; // Attach decoded user to request object
    next();
  } catch (err) {
    console.log('Invalid token:', err);
    return res.status(403).json({ message: 'Invalid token' }); // 403 Forbidden
  }
};


module.exports = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      next();
    } catch (err) {
      console.error('Invalid token:', err);
      return res.status(403).json({ message: 'Invalid token' });
    }
  };
};