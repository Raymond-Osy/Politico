import express from 'express';
import PartyController from '../controllers/PartyController';
import PartyValidator from '../middleware/PartyValidator';

const {
  getAllParties, createParty
} = PartyController;

const {
  createPartyValidator
} = PartyValidator;


const partyRouter = express.Router();

partyRouter.get('/', getAllParties);
partyRouter.post('/', createPartyValidator, createParty);

export default partyRouter;
