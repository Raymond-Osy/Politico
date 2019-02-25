import db from '../model/index';
import queries from '../model/queries';

/**
  * @class OfficeController
  * @description CRUD operations on offices
  */
class VoteController {
  /**
  * @static
  * @param {object} req - The request payload recieved from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - a response on success or failure
  * @memberOf VoteController
  */
  static createVote(req, res) {
    const { candidate, office } = req.body;
    const createdBy = req.user.id;
    // check if user has already voted for this office
    db.query(queries.checkIfVoteExists, [createdBy, office], (err, data) => {
      if (err) {
        return res.status(500).json({ status: 500, error: 'Cannot vote at the moment, Try again later.' });
      }
      const { rowCount } = data;
      if (rowCount === 0) {
        db.query(queries.createVote, [createdBy, candidate, office], (err) => {
          if (err) {
            return res.status(500).json({ status: 500, error: err });
          }
          return res.status(201).json({
            status: 201,
            data: [{
              office,
              candidate,
              voter: createdBy
            }]
          });
        });
      } else {
        return res.status(409).json({ status: 409, error: `You have already voted for office with ID ${office}` });
      }
    });
  }
}

export default VoteController;
