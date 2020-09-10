import express from 'express';
import cors from 'cors';

import routes from './routes'

const app = express();

app.use(express.json()); // Use é utilizado para colocar um plugin no express // Express não entende o formato json por padrão

app.use(cors());

app.use(routes);

app.listen(3333);