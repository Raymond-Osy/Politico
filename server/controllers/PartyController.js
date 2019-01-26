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

  static createParty(req, res) {
    const party = {
      id: parties.length === 0 ? 1 : parties.length + 1,
      name: req.body.name,
      hqAddress: req.body.hqAddress,
      logoUrl: req.body.logoUrl
    };

    parties.push(party);
    return res.status(201).send({
      status: 201,
      data: parties,
    });
  }

  static getAPartyById(req, res) {
    const { id } = req.params;
    const party = parties.find(p => p.id === parseInt(req.params.id));
    if (!party) {
      return res.status(404).json({
        status: 404,
        error: `Party with the given Id ${id} does not exist`
      });
    }
    return res.status(200).json({
      status: 200,
      data: party,
    });
  }

  static deleteParty(req, res) {
    const { id } = req.params;
    const party = parties.find(p => p.id === parseInt(req.params.id));
    if (!party) {
      return res.status(404).json({
        status: 404,
        error: `Party with the given Id ${id} was not found`
      });
    }
    const index = parties.indexOf(party);
    parties.splice(index, 1);

    return res.status(200).json({
      status: 200,
      data: party,
    });
  }
}

export default PartyController;
