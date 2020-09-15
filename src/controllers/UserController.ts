import { Request, Response } from 'express';
import { getManager } from "typeorm";
import { User } from '../database/entity/User';
import md5 from 'md5'

class UserController {
  async index ( request: Request, response: Response) {
    try {
      let userRepository = getManager().getRepository(User);
      let allUsers = await userRepository.find();
      response.json(allUsers);
    } catch(error) {
      console.log(error);
      response.sendStatus(500);
    }
  }

  async create( request: Request, response: Response) {
    let { username, pass } = request.body
    
    if (!username || !pass) {
      return response.sendStatus(400);
    }

    let hashedPass = md5(pass);
      
    try {
      let user = new User();
      user.username = username;
      user.pass = hashedPass;

      let userRepository = getManager().getRepository(User);
      await userRepository.save(user);

      response.status(201).json("Usuário criado (provavelmente)");
    } catch(error) {
      console.log(error);
      response.sendStatus(500);
    }
    
  }
}

export default UserController