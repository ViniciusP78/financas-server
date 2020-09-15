import express, { Request, Response} from 'express';

import UserController from './controllers/UserController'

const routes = express.Router();

const userController = new UserController();

routes.get('/user', userController.index);
routes.post('/user', userController.create);
routes.post('/login', userController.login);
routes.post('/auth', userController.auth);



export default routes;

