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
      const party = rows[0];
      return res.json({ status: 201, data: [{ party }] });
    });
  }

  /**
  * @static
  * @param {object} req - The request payload recieved from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - The particular party
  * @memberOf PartyController
  */
  static getAPartyById(req, res) {
    db.query(queries.getPartyById, [req.params.id], (err, dbRes) => {
      if (err) {
        return res.status(400).json({ status: 400, error: err });
      }
      const { rows, rowCount } = dbRes;
      if (rowCount === 0) {
        return res.status(404).json({ status: 404, error: `Party with ID ${req.params.id} does not exist` });
      }
      return res.status(200).json({ status: 200, data: rows[0] });
    });
  }

  /**
  * @static
  * @param {object} req - The request payload recieved from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - The particular party deleted
  * @memberOf PartyController
  */
  static deleteParty(req, res) {
    db.query(queries.deleteParty, [req.params.id], (err, dbRes) => {
      if (err) {
        return res.json({ sucess: false, message: 'Could not Delete entry', err });
      }
      if (dbRes.rowCount === 0) {
        return res.json({ sucess: false, message: `Party with ID ${req.params.id} does not exist`, err });
      }
      return res.status(200).json({
        status: 200,
        data: `Party with ID ${req.params.id} was successfully deleted`,
      });
    });
  }

  /**
  * @static
  * @param {object} req - The request payload recieved from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - The particular party name edited
  * @memberOf PartyController
  */
  static editParty(req, res) {
    db.query(queries.updateParty, [req.body.name, req.params.id], (err, dbRes) => {
      if (err) {
        return res.json({ sucess: false, message: 'Could not update party', err });
      }
      if (dbRes.rowCount === 0) {
        return res.json({ sucess: false, message: `Party with ID ${req.params.id} does not exist`, err });
      }
      return res.json({
        status: 200,
        data: {
          id: req.params.id,
          name: req.body.name
        }
      });
    });
  }
}

export default PartyController;
