import db from '../model/index';
import queries from '../model/queries';

/**
  * @class PartyController
  * @description CRUD operations on offices
  */
class PartyController {
  /**
  * @static
  * @param {object} req - The request payload recieved from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - List of all parties
  * @memberOf PartyController
  */
  static getAllParties(req, res) {
    db.query(queries.getAllParties, (err, dbRes) => {
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
  * @returns {object} - the created party
  * @memberOf PartyController
  */
  static createParty(req, res) {
    const { name, hqAddress, logoUrl } = req.body;

    db.query(queries.createParty, [name, hqAddress, logoUrl], (err, dbRes) => {
      if (err) {
        return res.status(400).json({ status: 400, error: err });
      }
      const { rows } = dbRes;
      const office = rows[0];
      return res.json({ status: 201, data: [{ office }] });
    });
  }
}

export default PartyController;
