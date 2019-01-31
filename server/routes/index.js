import express from 'express';
import partyRouter from './parties';
import officeRouter from './offices';
import userRouter from './users';

const router = express.Router();

router.use('/parties', partyRouter);
router.use('/offices', officeRouter);
router.use('/auth', userRouter);

export default router;
