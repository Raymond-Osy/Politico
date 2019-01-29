/**
  * @class PartyValidator
  * @description Validations on party controller
  */
class PartyValidator {
  /**
    * @static
    * @param {object} req - The request payload recieved from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - error messege if a wrong input is passed
    * @memberOf PartyValidator
    */
  static createPartyValidator(req, res, next) {
    const { name, hqAddress, logoUrl } = req.body;
    if (name) {
      if (typeof (name) !== 'string') {
        return res.status(400).send({
          status: 400,
          error: 'Name must contain letters only'
        });
      }
      if (name.length > 30) {
        return res.status(400).send({
          status: 400,
          error: 'Name too long'
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

    // Head quarter validations
    if (hqAddress) {
      if (hqAddress.length > 100) {
        return res.status(400).send({
          status: 400,
          error: 'Address too long'
        });
      }
      if (hqAddress.trim() === '') {
        return res.status(400).send({
          status: 400,
          error: 'Address must not be empty'
        });
      }
    } else {
      return res.status(400).send({
        status: 400,
        error: 'Address is not defined'
      });
    }

    // LogoUrl Validation
    if (logoUrl) {
      if (typeof (logoUrl) !== 'string') {
        return res.status(400).send({
          status: 400,
          error: 'Logo URL must be a string'
        });
      }
      if (logoUrl.trim() === '') {
        return res.status(400).send({
          status: 400,
          error: 'Logo Url must not be empty'
        });
      }
    } else {
      return res.status(400).send({
        status: 400,
        error: 'Logo Url is not defined'
      });
    }
    next();
  }
}

export default PartyValidator;
