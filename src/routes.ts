import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';


import UserController from './controllers/UserController';
import ActivityController from './controllers/ActivityController';

const routes = express.Router();

const userController = new UserController();
const activityController = new ActivityController();

routes.get('/user', userController.index);
routes.post('/user', userController.create);
routes.post('/login', userController.login);
routes.post('/auth', userController.auth);


routes.use('/activity', (request, response, next) => {
  let { token } = request.headers;

  jwt.verify(String(token), "xcasdsa", (err, decoded: any) => {
    if (err) return response.status(403).json({ auth: false, message: 'Failed to authenticate token.' });

    if (!decoded) return response.sendStatus(500);

    response.locals.userId = decoded.id;
    next();
  })
})
routes.get('/activity', activityController.index);
routes.post('/activity', activityController.create);
routes.put('/activity/:id', activityController.update);
routes.delete('/activity/:id', activityController.delete);



export default routes;

