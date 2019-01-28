import express from 'express';
import offices from '../database/dummydbOffices';

const app = express();
app.use(express.json());

/**
  * @class OfficeController
  * @description CRUD operations on offices
  */
class OfficeController {
  /**
  * @static
  * @param {object} req - The request payload recieved from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - List of all offices
  * @memberOf OfficeController
  */
  static getAllOffices(req, res) {
    if (offices.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 'No Offices available at this time'
      });
    }
    return res.json({ offices });
  }

  /**
  * @static
  * @param {object} req - The request payload recieved from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - The particular office
  * @memberOf OfficeController
  */
  static getAnOfficeById(req, res) {
    const { id } = req.params;
    const office = offices.find(p => p.id === parseInt(req.params.id));
    if (!office) {
      return res.status(404).json({
        status: 404,
        error: `Office with the given Id ${id} does not exist`
      });
    }
    return res.status(200).json({
      status: 200,
      data: office,
    });
  }

  /**
  * @static
  * @param {object} req - The request payload recieved from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - a created office
  * @memberOf OfficeController
  */
  static createOffices(req, res) {
    const office = {
      id: offices.length === 0 ? 1 : offices.length + 1,
      type: req.body.type,
      name: req.body.name
    };

    offices.push(office);
    return res.status(201).json({
      status: 201,
      data: offices,
    });
  }
}

export default OfficeController;
