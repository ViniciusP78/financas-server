import express from 'express';
import cors from 'cors';
import "reflect-metadata";
import { createConnection } from 'typeorm'
import routes from './routes'


createConnection().then(async connection => {

  const app = express();

  app.use(express.json()); // Use é utilizado para colocar um plugin no express // Express não entende o formato json por padrão

  app.use(cors());

  app.use(routes);

  app.listen(3333);

  console.log('Application Running...');

}).catch(error => console.log("TypeORM connection error: ", error));