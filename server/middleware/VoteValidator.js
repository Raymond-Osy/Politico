/**
  * @class VoteValidator
  * @description Validations on Vote controller
  */
class VoteValidator {
  /**
      * @static
      * @param {object} req - The request payload recieved from the router
      * @param {object} res - The response payload sent back from the controller
      * @returns {object} - error messege if a wrong input is passed
      * @memberOf VoteValidator
      */
  static createVoteValidator(req, res, next) {
    const { candidate, office } = req.body;
    if (candidate) {
      if (!Number.isInteger(candidate)) {
        return res.status(400).send({
          status: 400,
          error: 'Candidate must be an integer'
        });
      }
    } else {
      return res.status(400).send({
        status: 400,
        error: 'Candidate is not defined'
      });
    }

    if (office) {
      if (!Number.isInteger(office)) {
        return res.status(400).send({
          status: 400,
          error: 'office must be an enteger'
        });
      }
    } else {
      return res.status(400).send({
        status: 400,
        error: 'Office is not defined'
      });
    }
    next();
  }
}

export default VoteValidator;
