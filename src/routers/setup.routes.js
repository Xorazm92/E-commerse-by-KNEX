import express from 'express';
import { setupController } from '../controllers/index';

export const setupRouter = express.Router();

setupRouter.post('/migrate', setupController);

