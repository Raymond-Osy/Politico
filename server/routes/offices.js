import express from 'express';
import OfficeController from '../controllers/OfficeController';
import OfficeVAlidator from '../middleware/OfficeValidator';

const {
  getAllOffices, getAnOfficeById, createOffices
} = OfficeController;

const {
  createOfficeValidator
} = OfficeVAlidator;

const officeRouter = express.Router();

officeRouter.get('/', getAllOffices);
officeRouter.get('/:id', getAnOfficeById);
officeRouter.post('/', createOfficeValidator, createOffices);

export default officeRouter;
