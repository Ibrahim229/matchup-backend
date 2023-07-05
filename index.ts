import { config } from 'dotenv';
import express from 'express';
import apiRouter from './api';
import cors from "cors";
import './db';
import './cronJob/cronJob';
import  './helpers/generate-pass';
// import './index.d.ts';
require('./config/passport');


config();

const app = express();
app.use(cors)
var bodyParser = require('body-parser')
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRouter);


app.listen(process.env.PORT);