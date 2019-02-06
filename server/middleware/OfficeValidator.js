/**
  * @class OfficeValidator
  * @description Validations on party controller
  */
class OfficeValidator {
  /**
      * @static
      * @param {object} req - The request payload recieved from the router
      * @param {object} res - The response payload sent back from the controller
      * @returns {object} - error messege if a wrong input is passed
      * @memberOf PartyValidator
      */
  static createOfficeValidator(req, res, next) {
    const { name } = req.body;
    if (name) {
      if (typeof (name) !== 'string') {
        return res.status(400).send({
          status: 400,
          error: 'Name must contain letters only'
        });
      }
      if (name.trim() === '') {
        return res.status(400).send({
          status: 400,
          error: 'Name must not be empty'
        });
      }
    } else {
      return res.status(400).send({
        status: 400,
        error: 'Name is not defined'
      });
    }
    next();
  }
}

export default OfficeValidator;
