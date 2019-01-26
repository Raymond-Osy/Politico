import express from 'express';
import OfficeController from '../controllers/OfficeController';

const {
  getAllOffices
} = OfficeController;

const officeRouter = express.Router();

officeRouter.get('/', getAllOffices);

export default officeRouter;
