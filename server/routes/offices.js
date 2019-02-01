import express from 'express';
import OfficeController from '../controllers/OfficeController';
import OfficeVAlidator from '../middleware/OfficeValidator';
import Authenticator from '../middleware/authenticator';

const {
  createOffice, getAllOffices, getAnOfficeById, registerCandidate
} = OfficeController;

const {
  createOfficeValidator
} = OfficeVAlidator;

const officeRouter = express.Router();

officeRouter.post('/', createOfficeValidator, Authenticator.isAuthenticated, Authenticator.isAuthorised, createOffice);
officeRouter.get('/', Authenticator.isAuthenticated, getAllOffices);
officeRouter.get('/:id', Authenticator.isAuthenticated, getAnOfficeById);
officeRouter.post('/:userId/register', Authenticator.isAuthenticated, registerCandidate);

export default officeRouter;
