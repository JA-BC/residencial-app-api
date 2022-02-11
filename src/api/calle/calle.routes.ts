import express from 'express';
import * as controller from './calle.controller';
import { authorization } from '../../core/middlewares';

const router = express.Router();

router.use(authorization)
    .get('/find', controller.find)
    .get('/requery/:id', controller.requery)
    .post('/create', controller.create)
    .post('/update/:id', controller.update)
    .post('/remove', controller.remove);

export default router;