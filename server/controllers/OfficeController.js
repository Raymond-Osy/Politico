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
}

export default OfficeController;
