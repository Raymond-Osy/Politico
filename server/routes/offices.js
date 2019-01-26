import express from 'express';
import OfficeController from '../controllers/OfficeController';

const {
  getAllOffices, getAnOfficeById, createOffices
} = OfficeController;

const officeRouter = express.Router();

officeRouter.get('/', getAllOffices);
officeRouter.get('/:id', getAnOfficeById);
officeRouter.post('/', createOffices);

export default officeRouter;
