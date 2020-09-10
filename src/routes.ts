import express, { Request, Response} from 'express';

import UserController from './controllers/UserController'

const routes = express.Router();

const userController = new UserController();

routes.get('/user', userController.index);
routes.post('/user', userController.create);

export default routes;

