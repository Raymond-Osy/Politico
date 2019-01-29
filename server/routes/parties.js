import express from 'express';
import PartyController from '../controllers/PartyController';
import PartyVAlidator from '../middleware/PartyValidator';

const {
  getAllParties, getAPartyById, createParty, deleteParty, editParty
} = PartyController;

const {
  createPartyValidator
} = PartyVAlidator;

const partyRouter = express.Router();

partyRouter.get('/', getAllParties);
partyRouter.get('/:id', getAPartyById);
partyRouter.post('/', createPartyValidator, createParty);
partyRouter.delete('/:id', deleteParty);
partyRouter.patch('/:id/name', editParty);

export default partyRouter;
