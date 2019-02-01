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
    const { type, name } = req.body;
    db.query(queries.createOffice, [type, name], (err, dbRes) => {
      if (err) {
        return res.status(400).json({ status: 400, error: err });
      }
      const { rows } = dbRes;
      const office = rows[0];
      return res.status(201).json({ status: 201, data: [{ office }] });
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
        return res.status(400).json({ status: 400, error: err });
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
        return res.status(400).json({ status: 400, error: err });
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
        return res.json({ status: 500, error: 'Cannot register at the moment' });
      }
      const { rowCount } = data;
      if (rowCount === 0) {
        db.query(queries.createCandidate, [office, party, req.params.userId], (err, dbRes) => {
          if (err) {
            return res.status(400).json({ status: 400, error: err });
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
        return res.json({ status: 409, error: 'Candidate is already registerd' });
      }
    });
  }
}

export default OfficeController;
