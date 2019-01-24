import parties from '../database/dummydbParties';

class PartyController {
  static getAllParties(req, res) {
    if (parties.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 'No Parties available at this time'
      });
    }
    return res.status(200).json({
      status: 200,
      data: parties
    });
  }
}

export default PartyController;
