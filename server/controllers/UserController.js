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
    let {
      // eslint-disable-next-line prefer-const
      firstname, lastname, othername, email, phoneNumber, passportUrl, password
    } = req.body;

    firstname = firstname.trim();
    lastname = lastname.trim();
    othername = othername.trim();
    email = email.trim();
    const hashedPassword = Authenticator.hashPassword(password);
    // eslint-disable-next-line max-len
    const parameters = [firstname, lastname, othername, email, phoneNumber, passportUrl, hashedPassword];

    db.query(queries.insertIntoUsers,
      parameters,
      (err, dbRes) => {
        if (err) {
          if (err.code === '23505') {
            return res.status(409).json({ status: 409, error: 'Email Address already exist in our database' });
          }
          console.log(err, '==================');
          return res.json({ status: 500, error: 'Could not register at the moment. Try again later.' });
        }
        const user = dbRes.rows[0];
        const { id } = user;
        const token = Authenticator.generateToken({ email, id });
        return res.status(201).json({ status: 201, data: [{ token, user }] });
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

    db.query(queries.queryUsers, [email], (err, dbRes) => {
      if (err) {
        console.log(err, '==================');
        return res.status(500).json({
          status: 500,
          message: 'Cannot signup at the moment. Try again later.'
        });
      }
      const { rows, rowCount } = dbRes;
      if (rowCount !== 1) {
        return res.status(409).json({
          status: 409,
          message: 'Incorrect Email or password'
        });
      }
      const verifyPassword = Authenticator.comparePassword(password, rows[0].password);
      if (!verifyPassword) {
        return res.status(409).json({
          status: 409,
          error: 'Incorrect Email or password',
        });
      }

      const user = rows[0];
      const { id, isadmin } = user;
      const token = Authenticator.generateToken({ id, email, isadmin });
      return res.status(200).json({ status: 200, data: [{ token, user }] });
    });
  }
}

export default UserController;
