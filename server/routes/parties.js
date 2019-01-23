import express from 'express';
import Parties from '../controllers/parties';

const {
  getAllParties
} = Parties;

const partyRouter = express.Router();

partyRouter.get('/', getAllParties);

export default partyRouter;
