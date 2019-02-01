import express from 'express';
import PartyController from '../controllers/PartyController';
import PartyValidator from '../middleware/PartyValidator';

const {
  getAllParties, createParty, getAPartyById, deleteParty
} = PartyController;

const {
  createPartyValidator
} = PartyValidator;


const partyRouter = express.Router();

partyRouter.get('/', getAllParties);
partyRouter.post('/', createPartyValidator, createParty);
partyRouter.get('/:id', getAPartyById);
partyRouter.delete('/:id', deleteParty);


export default partyRouter;
