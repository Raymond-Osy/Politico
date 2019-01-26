import express from 'express';
import offices from '../database/dummydbOffices';

const app = express();
app.use(express.json());

class OfficeController {
  static getAllOffices(req, res) {
    if (offices.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 'No Offices available at this time'
      });
    }
    return res.json({ offices });
  }

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
}

export default OfficeController;
