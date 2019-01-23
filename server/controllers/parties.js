import express from 'express';
import parties from '../database/dummydbParties';

const app = express();
app.use(express.json());

class Parties {
  static getAllParties(req, res) {
    if (parties.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 'No Parties available at this time'
      });
    }
    return res.json({ parties });
  }
}

export default Parties;
