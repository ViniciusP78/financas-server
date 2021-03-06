import { Request, Response } from 'express';
import { getManager } from "typeorm";
import { Activity } from '../database/entity/Activity';
import { User } from '../database/entity/User';

class ActivityController {
  async index (request: Request, response: Response) {
    try {
      let userRepository = getManager().getRepository(User);
      let user = await userRepository.findOneOrFail(Number(response.locals.userId));

      let activityRepository = getManager().getRepository(Activity);
      let allActivities = await activityRepository.find({where: {user}});
      response.json(allActivities);
    } catch(error) {
      console.log(error);
      response.sendStatus(500);
    }
  }
  async create (request: Request, response: Response) {

    let { value, desc } = request.body;

    if (!value || !desc) {
      return response.sendStatus(400);
    }

    try {
      let user = new User();
      user.id = Number(response.locals.userId);

      let activity = new Activity();
      activity.value = value;
      activity.description = desc;
      activity.user = user;

      let activityRepository = getManager().getRepository(Activity);
      await activityRepository.save(activity);

      return response.status(201).json("Atividade Criada (provavelmente)");
    } catch(error) {
      console.log(error);
      return response.sendStatus(500);
    }


  }
  async update (request: Request, response: Response) {

    let { value, desc } = request.body;

    let id = request.params.id;

    if (!value || !desc) {
      return response.sendStatus(400);
    }

    try {
      let user = new User();
      user.id = Number(response.locals.userId);

      let activityRepository = getManager().getRepository(Activity);
      let activityToUpdate = await activityRepository.findOneOrFail({where: {id, user}})
      activityToUpdate.value = value;
      activityToUpdate.description = desc;
      await activityRepository.save(activityToUpdate)


      response.json(activityToUpdate);

    } catch(error) {
      console.log(error);
      return response.sendStatus(500);
    }

  }
  async delete (request: Request, response: Response) {
    let id = request.params.id;

    try {
      let user = new User();
      user.id = Number(response.locals.userId);

      let activityRepository = getManager().getRepository(Activity);
      let activityToDelete = await activityRepository.findOneOrFail({where: {id, user}})
      await activityRepository.remove(activityToDelete);

      return response.sendStatus(200);

    } catch(error) {
      console.log(error);
      return response.sendStatus(500);
    }
  }
}

export default ActivityController;
