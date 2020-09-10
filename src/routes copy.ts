import express, { Request, Response} from 'express';
import jwt from 'jsonwebtoken';

import UsersController from './controllers/UserController'

const routes = express.Router();

const usersController = new UsersController();

const secret = 'secret';

const authJWT = (request: Request, response: Response, next: Function) =>{

}

routes.get('/login', (request, response) => {
  let id = 1;

  let token = jwt.sign({ id }, secret, {expiresIn:300});

  response.json({ auth: true, token })
});

routes.get('/auth', (request, response) => {
  let { token } = request.headers;

  if (!token) return response.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(String(token), secret, (err, decoded: any) => {
    if (err) return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

    if (!decoded) return response.sendStatus(500);
    
    response.json(decoded.id);
  })
})

export default routes;

