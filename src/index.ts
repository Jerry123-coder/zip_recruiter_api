import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { dbConnection } from './database/dbConnection';
import routes from './routes';


const port = 9000;
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use(routes);






const start = async() => {
  await dbConnection();
 
  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
} 

start();