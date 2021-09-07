const express = require('express');
const csvtojson = require("csvtojson");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();// todo only for devlopment not for production 

const app = express();


const port = process.env.port || 3000;
mongoose.Promise = global.Promise;
const logger = require('./middleware/logger');


app.use(cors());


app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());


  require('./config/dbconfig');
  require('./routes')(app);




  app.listen(port, () => logger.info(`Listening on port ${port}`));
