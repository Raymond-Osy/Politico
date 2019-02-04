import express from 'express';
import partyRouter from './parties';
import officeRouter from './offices';
import userRouter from './users';
import voteRouter from './votes';

const router = express.Router();

router.use('/parties', partyRouter);
router.use('/offices', officeRouter);
router.use('/auth', userRouter);
router.use('/votes', voteRouter);

export default router;
