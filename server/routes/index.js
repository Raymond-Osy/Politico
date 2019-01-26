import express from 'express';
import partyRouter from './parties';
import officeRouter from './offices';

const router = express.Router();

router.use('/parties', partyRouter);
router.use('/offices', officeRouter);

export default router;
