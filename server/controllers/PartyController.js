import parties from '../database/dummydbParties';

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

  /**
  * @static
  * @param {object} req - The request payload recieved from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - the created party
  * @memberOf PartyController
  */
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

  /**
  * @static
  * @param {object} req - The request payload recieved from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - The particular party
  * @memberOf PartyController
  */
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

  /**
  * @static
  * @param {object} req - The request payload recieved from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - The particular party deleted
  * @memberOf PartyController
  */
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

  /**
  * @static
  * @param {object} req - The request payload recieved from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - The particular party name edited
  * @memberOf PartyController
  */
  static editParty(req, res) {
    const party = parties.find(p => p.id === parseInt(req.params.id));
    if (!party) {
      return res.status(404).json({
        status: 404,
        error: 'Party with the given Id was not found'
      });
    }
    const partyId = parties.id;
    party.name = req.body.name;
    res.status(200).json({
      status: 200,
      data: [{
        id: partyId,
        party,
      }]
    });
  }
}

export default PartyController;
