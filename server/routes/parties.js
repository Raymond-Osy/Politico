import express from 'express';
import PartyController from '../controllers/PartyController';
import PartyValidator from '../middleware/PartyValidator';
import Authenticator from '../middleware/authenticator';

const {
  getAllParties, createParty, getAPartyById, deleteParty, editParty
} = PartyController;

const {
  createPartyValidator
} = PartyValidator;


const partyRouter = express.Router();

partyRouter.get('/', Authenticator.isAuthenticated, getAllParties);
partyRouter.post('/', Authenticator.isAuthenticated, Authenticator.isAuthorised, createPartyValidator, createParty);
partyRouter.get('/:id', Authenticator.isAuthenticated, getAPartyById);
partyRouter.delete('/:id', Authenticator.isAuthenticated, deleteParty);
partyRouter.patch('/:id/name', Authenticator.isAuthenticated, editParty);


export default partyRouter;
