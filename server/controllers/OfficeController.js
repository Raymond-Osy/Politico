import db from '../model/index';
import queries from '../model/queries';

/**
  * @class OfficeController
  * @description CRUD operations on offices
  */
class OfficeController {
  /**
  * @static
  * @param {object} req - The request payload recieved from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - a created office
  * @memberOf OfficeController
  */
  static createOffice(req, res) {
    let { type, name } = req.body;

    name = name.trim();
    type = type.trim();
    const parameters = [type, name];

    db.query(queries.createOffice, parameters, (err, dbRes) => {
      if (err) {
        return res.status(500).json({ status: 500, error: 'Can not create office, Please check inputs and Try again later' });
      }
      const { rows } = dbRes;
      // const office = rows[0];
      return res.status(201).json({ status: 201, data: rows });
    });
  }

  /**
  * @static
  * @param {object} req - The request payload recieved from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - List of all offices
  * @memberOf OfficeController
  */
  static getAllOffices(req, res) {
    db.query(queries.getAllOffices, (err, dbRes) => {
      if (err) {
        return res.status(500).json({ status: 500, error: 'Can not get all offices at the moment, Try again later' });
      }
      const { rows } = dbRes;
      return res.status(200).json({ status: 200, data: rows });
    });
  }

  /**
  * @static
  * @param {object} req - The request payload recieved from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - The particular office
  * @memberOf OfficeController
  */
  static getAnOfficeById(req, res) {
    db.query(queries.getAnOfficeById, [req.params.id], (err, dbRes) => {
      if (err) {
        return res.status(500).json({ status: 500, error: 'Can not get a party at the moment, Try again later' });
      }
      const { rows, rowCount } = dbRes;
      if (rowCount === 0) {
        return res.status(404).json({ status: 404, error: 'Office not found' });
      }
      return res.status(200).json({ status: 200, data: rows[0] });
    });
  }

  /**
  * @static
  * @param {object} req - The request payload recieved from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - registered candidate
  * @memberOf OfficeController
  */
  static registerCandidate(req, res) {
    const { office, party } = req.body;

    // check if user is already registered
    db.query(queries.getCandidate, [req.params.userId], (err, data) => {
      if (err) {
        return res.status(500).json({ status: 500, error: 'Cannot register at the moment' });
      }
      const { rowCount } = data;
      // checks the candidate table to see if there is candidate
      if (rowCount === 0) {
        db.query(queries.createCandidate, [office, party, req.params.userId], (err, dbRes) => {
          if (err) {
            return res.status(500).json({ status: 500, error: err.detail });
          }
          const { rows } = dbRes;
          const candidate = rows[0];
          return res.status(201).json({
            status: 201,
            data: [{
              office: candidate.office,
              user: candidate.candidate
            }]
          });
        });
      } else {
        return res.status(409).json({ status: 409, error: 'Candidate is already registerd' });
      }
    });
  }

  /**
  * @static
  * @param {object} req - The request payload recieved from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - The particular office
  * @memberOf OfficeController
  */
  static fetchResults(req, res) {
    db.query(queries.queryCandidatesByOfficeId, [req.params.officeId], (err, dbRes) => {
      if (err) {
        return res.status(500).json({ status: 500, error: err });
      }
      const { rows, rowCount } = dbRes;
      if (rowCount === 0) {
        return res.status(404).json({ status: 404, error: 'votes not found' });
      }
      const candidates = rows.map(row => row.candidate);
      db.query(queries.queryVotesByOfficeId, [req.params.officeId], (err, dbres) => {
        if (err) {
          return res.status(500).json({ status: 500, error: err });
        }
        if (dbres.rowCount === 0) {
          return res.status(404).json({ status: 404, error: 'Office not found' });
        }
        const votes = dbres.rows;
        const result = candidates.map((candidate) => {
          const candidateResult = {
            office: req.params.officeId,
            candidate,
            result: 0
          };
          const individualVotes = votes.filter(vote => vote.candidate === candidate);

          candidateResult.result = individualVotes.length;
          return candidateResult;
        });
        return res.status(200).json({ status: 200, data: result });
      });
    });
  }
}

export default OfficeController;
