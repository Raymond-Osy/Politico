/**
  * @class UserValidator
  * @description Validations on User controller
  */
class UserValidator {
  /**
      * @static
      * @param {object} req - The request payload recieved from the router
      * @param {object} res - The response payload sent back from the controller
      * @returns {object} - a JSON response
      * @memberOf UserValidator
      */
  static SigninValidator(req, res, next) {
    const errors = {};
    const {
      firstname, lastname, othernames, email, phoneNumber, passportUrl, password, confirmPassword
    } = req.body;
    if (firstname) {
      if (!/^[a-zA-Z_ ]+$/.test(firstname)) {
        errors.firstname = 'Invalid First-name';
      } else if (firstname.trim() === '') {
        errors.firstname = 'Must contain First-name';
      }
    } else {
      errors.firstname = 'First-Name is not defined';
    }

    if (lastname) {
      if (!/^[a-zA-Z_ ]+$/.test(lastname)) {
        errors.lastname = 'Invalid Last-name';
      } else if (lastname.trim() === '') {
        errors.lastname = 'Must contain Last-name';
      }
    } else {
      errors.lastname = 'Last-Name is not defined';
    }

    if (othernames) {
      if (!/^[a-zA-Z_ ]+$/.test(othernames)) {
        errors.othernames = 'Invalid Other-name';
      } else if (othernames.trim() === '') {
        errors.othernames = 'Must contain Other-name';
      }
    } else {
      errors.othernames = 'Other-Name is not defined';
    }

    if (email) {
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        errors.email = 'Invalid email';
      } else if (email === '') {
        errors.email = 'Must contain email';
      }
    } else {
      errors.email = 'Email is not defined';
    }

    if (phoneNumber) {
      if (!/^[+\d\-\s]+$/.test(phoneNumber)) {
        errors.phoneNumber = 'Invalid Phone Number';
      }
    } else {
      errors.phoneNumber = 'Phone Number is not defined';
    }

    if (passportUrl) {
      if (passportUrl.trim() === '') {
        return res.status(400).send({
          status: 400,
          error: 'passportUrl must not be empty'
        });
      }
    } else {
      return res.status(400).send({
        status: 400,
        error: 'passportUrl is not defined'
      });
    }


    if (password) {
      if (password === '') {
        errors.password = 'Password Empty';
      } else if (/\s/.test(password)) {
        errors.password = 'space not allowed on password';
      }
    } else {
      errors.password = 'Password is not defined';
    }

    if (confirmPassword) {
      if (confirmPassword === '') {
        errors.confirmPassword = 'Please Retype Password';
      } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Password does not match';
      }
    } else {
      errors.confirmPassword = 'Undefined field, confirm Password';
    }
    // check if there where any errors
    const errorLength = Object.keys(errors).length;
    if (errorLength === 0) {
      next();
    } else {
      res.status(400).json({ status: 400, message: 'Please check your inputs', errors });
    }
  }

  /**
      * @static
      * @param {object} req - The request payload recieved from the router
      * @param {object} res - The response payload sent back from the controller
      * @returns {object} - a JSON response
      * @memberOf UserValidator
      */
  static LoginValidator(req, res, next) {
    const errors = {};
    const { email, password } = req.body;

    if (email) {
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        errors.email = 'invalid email';
      } else if (email === '') {
        errors.email = 'invalid email';
      }
    } else {
      errors.email = 'Email is not defimed';
    }

    if (password) {
      if (password === '') {
        errors.password = 'Password Empty';
      } else if (/\s/.test(password)) {
        errors.password = 'space not allowed on password';
      }
    } else {
      errors.password = 'Password is not defined';
    }

    const errorLength = Object.keys(errors).length;
    if (errorLength === 0) {
      next();
    } else {
      res.status(400).json({ status: 400, message: 'Please check your inputs', errors });
    }
    next();
  }
}

export default UserValidator;
