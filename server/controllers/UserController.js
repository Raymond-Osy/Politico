import Authenticator from '../middleware/authenticator';
import queries from '../model/queries';
import db from '../model/index';

/**
  * @class UserController
  * @description Authenticates and gives access to users
  */
class UserController {
  /**
    * @static
    * @param {object} req - The request payload recieved from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - A verified user
    * @memberOf UserController
    */
  static signUp(req, res) {
    const {
      firstname, lastname, othernames, email, phoneNumber, passportUrl, password
    } = req.body;

    db.query(queries.insertIntoUsers,
      [firstname, lastname, othernames, email, phoneNumber, passportUrl, password],
      (err, dbRes) => {
        if (err) {
          if (err.code === '23505') {
            return res.json({ status: 409, error: 'Email Address already exist in our database' });
          }
          return res.json({ status: 500, error: 'Could not register at the moment. Try again later.' });
        }
        const user = dbRes.rows[0];
        const { id } = user;
        const token = Authenticator.generateToken({ email, id });
        return res.json({ status: 201, data: [{ token, user }] });
      });
  }

  /**
    * @static
    * @param {object} req - The request payload recieved from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - A verified user
    * @memberOf UserController
    */
  static login(req, res) {
    const { email, password } = req.body;

    db.query(queries.queryUsers, [email, password], (err, dbRes) => {
      console.log(err, '================================');
      if (err) {
        return res.json({
          status: 500,
          message: 'Cannot signup at the moment. Try again later.'
        });
      }
      const { rows, rowCount } = dbRes;
      if (rowCount !== 1) {
        return res.status(401).json({
          status: 409,
          message: 'Incorrect Email or password'
        });
      }
      const user = rows[0];
      const { id } = user;
      const token = Authenticator.generateToken({ id, email });
      return res.status(200).json({ status: 200, data: [{ token, user }] });
    });
  }
}

export default UserController;
