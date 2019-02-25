import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

export default {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  comparePassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
  },

  generateToken(user) {
    const token = jwt.sign({ user }, process.env.JWTKEY, { expiresIn: '24h' });
    return token;
  },

  isAuthenticated(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      res.status(403).json({
        status: 403,
        error: 'Missing x-access-token in the request header'
      });
    } else {
      jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
        if (err) {
          return res.status(403).json({
            status: 403,
            message: 'Invalid token supplied'
          });
        }
        req.user = decoded.user;
        next();
      });
    }
  },

  isAuthorised(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      res.status(403).json({
        status: 404,
        message: 'Missing x-access-token in the request header'
      });
    } else {
      jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
        if (err) {
          return res.status(403).json({
            status: 403,
            error: 'Invalid token supplied'
          });
        }
        if (decoded.user.isadmin !== true) {
          return res.status(403).json({
            status: 403,
            error: 'Unauthorised User'
          });
        }
        req.user = decoded.user;
        next();
      });
    }
  }
};
