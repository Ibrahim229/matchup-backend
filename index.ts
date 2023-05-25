import { config } from 'dotenv';
import express from 'express';
import apiRouter from './api';
import mongoose from 'mongoose';
require('./config/passport');


config();
mongoose.connect(process.env.MONGO_URI!);

const app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(process.env.PORT);