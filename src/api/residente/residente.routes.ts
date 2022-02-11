import express from 'express';
import * as controller from './residente.controller';
import { authorization } from '../../core/middlewares';

const router = express.Router();

router.use(authorization)
    .get('/find', controller.find)
    .get('/requery/:id', controller.requery)
    .post('/create', controller.create)
    .post('/update/:id', controller.update)
    .post('/remove', controller.remove)
    .post('/moveTo', controller.moveTo);

export default router;