import express from 'express';
import PartyController from '../controllers/PartyController';

const {
  getAllParties, getAPartyById
} = PartyController;

const partyRouter = express.Router();

partyRouter.get('/', getAllParties);
partyRouter.get('/:id', getAPartyById);

export default partyRouter;
