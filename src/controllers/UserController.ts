import { Request, Response } from 'express';
import { getManager } from "typeorm";
import { User } from '../database/entity/User';
import md5 from 'md5';
import jwt from 'jsonwebtoken';

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

  secret = "xcasdsa"; // mudar de local depois

  async login( request: Request, response: Response ) {
    let { username, pass } = request.body

    if (!username || !pass) {
      return response.sendStatus(400);
    }

    let userRepository = getManager().getRepository(User);

    let user = await userRepository.findOne({username});

    if (!user) {
      return response.status(404).json("Usuário ou Senha Incorretos");
    }

    if (user.pass === md5(pass)){
      let token = jwt.sign({id: String(user.id)}, "xcasdsa", {expiresIn:300});

      return response.json({ auth: true, token })
    }

    response.json(user);

  }

  auth( request: Request, response: Response ) {
    let { token } = request.headers;

    if (!token) return response.status(401).json({ auth: false, message: 'No token provided.' });
  
    jwt.verify(String(token), "xcasdsa", (err, decoded: any) => {
      if (err) return response.status(403).json({ auth: false, message: 'Failed to authenticate token.' });
  
      if (!decoded) return response.sendStatus(500);
      
      response.json(decoded.id);
    })
  }
}

export default UserController;