import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { dbConnection } from './database/dbConnection';
import routes from './routes';
import {  jobApplications, recruiterJobs } from './models/associations.models';
import { upload } from './services/multer.services';


const port = 9000;
const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use(routes);

app.post('/upload', upload.single('pdf'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file provided' });
  }
  // Process the uploaded file (e.g., save it to the database, perform further operations)

  res.status(200).json({ message: 'File uploaded successfully' });
});




const start = async() => {
  recruiterJobs()
  jobApplications()
  await dbConnection();
  
  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
} 

start();