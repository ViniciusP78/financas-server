import { Request, Response } from 'express';
import { createConnection } from "typeorm";
import { User } from '../database/entity/User';
import md5 from 'md5'

class UserController {
  create( request: Request, response: Response) {
    let { username, pass } = request.body
    
    if (!username || !pass) {
      return response.sendStatus(401);
    }

    let hashedPass = md5(pass);

    createConnection().then( async connection => {
      
      let user = new User();
      user.username = username;
      user.pass = hashedPass;

      let userRepository = connection.getRepository(User);
      await userRepository.save(user);

      response.json("Usuário criado (provavelmente)");

    }).catch(error => response.json(error))
    
  }
}

export default UserController