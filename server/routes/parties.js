import express from 'express';
import PartyController from '../controllers/PartyController';

const {
  getAllParties
} = PartyController;


const partyRouter = express.Router();

partyRouter.get('/', getAllParties);

export default partyRouter;
