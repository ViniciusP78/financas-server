import { Request, Response } from 'express';
import { createConnection } from "typeorm";
import { User } from '../database/entity/User';
import md5 from 'md5'

class UserController {
  index( request: Request, response: Response) {

    createConnection().then( async connection => {
      
      let userRepository = connection.getRepository(User);

      let allUsers = await userRepository.find();

      response.json(allUsers);

    }).catch(error => response.json(error))
  }

  create( request: Request, response: Response) {
    let { username, pass } = request.body
    
    if (!username || !pass) {
      return response.sendStatus(400);
    }

    let hashedPass = md5(pass);

    createConnection().then( async connection => {
      
      let user = new User();
      user.username = username;
      user.pass = hashedPass;

      let userRepository = connection.getRepository(User);
      await userRepository.save(user);

      response.status(201).json("Usuário criado (provavelmente)");

    }).catch(error => response.json(error))
    
  }
}

export default UserController