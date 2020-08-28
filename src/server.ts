import express from 'express';

const app = express();

app.get('/test', ( request, response ) => {
  const filters = request.query;
  console.log(filters);
  response.send(`Hello ${filters}`);
});

app.listen(3333);