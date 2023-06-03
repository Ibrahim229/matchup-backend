import { config } from 'dotenv';
import express from 'express';
import apiRouter from './api';
import './db';
import './cronJob/cronJob';
import './index.d.ts';
require('./config/passport');


config();

const app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRouter);

app.listen(process.env.PORT);