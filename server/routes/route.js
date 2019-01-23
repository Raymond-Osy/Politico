import express from 'express';
import partyRouter from './parties';

const router = express.Router();

router.use('/parties', partyRouter);

export default router;
