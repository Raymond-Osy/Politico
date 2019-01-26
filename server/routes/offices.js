import express from 'express';
import OfficeController from '../controllers/OfficeController';

const {
  getAllOffices, getAnOfficeById
} = OfficeController;

const officeRouter = express.Router();

officeRouter.get('/', getAllOffices);
officeRouter.get('/:id', getAnOfficeById);

export default officeRouter;
