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

var bodyParser = require('body-parser')
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRouter);


app.listen(process.env.PORT);