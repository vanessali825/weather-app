/** IMPORT PACKAGES */ 
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

// Knex + JWT + Password Config
const NODE_ENV = process.env.NODE_ENV || 'development';
const knexfile = require('./knexfile')[NODE_ENV];
const knex = require('knex')(knexfile);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtStrategy = require('./jwt-strategy')(knex);
require("dotenv").config();

/** CREATE EXPRESS APP */ 
const app = express();
const port = 8000;

/** INITIALIZE MIDDLEWARE */ 
app.use(morgan('dev')); // facilitates debugging on backend
app.use(cors({origin: process.env.FRONTEND_SERVER})); // allows cross-origin resource sharing
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded; for post requests
app.use(bodyParser.json()) // parse application/json; for post requests
jwtStrategy.initialize();

/** EMPTY VARIABLES */ 
let lng;
let lat;

/** GET REQUEST - INDEX PAGE */
app.get('/', async (req, res) => {
    res.send('Hello world!')
})

/** ACCOUNT ROUTES - SIGN UP + LOG IN */ 
app.post("/auth/signup", async (req, res) => {
    const { email, password } = req.body;
    let query = await knex("users").where({ email }).first();
    if (query === undefined) {
      const hashed = await bcrypt.hash(password, 10);
      await knex("users").insert({ email, password: hashed });
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  })
  
app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
    let query = await knex("users").where({ email }).first();
    if (query) {
      let result = await bcrypt.compare(password, query.password);  
      if (result) {
        const payload = {
          id: query.id,
          email: query.email,
        }; 
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.json( { token });
      } else { 
        res.sendStatus(401);
      }
    }
  });
  
/** ACCOUNT AUTHENTICATION */ 
app.get("/data", jwtStrategy.authenticate(), async (req, res) => {
    res.json(["a", "b", "c"])
})

/**  POST REQUEST - RECEIVE COORDINATE DATA FROM CLIENT */ 
app.post('/coordinates', async (req, res) => {
    const body = await req.body;
    lat = body.Lat;
    lng = body.Lng;
    console.log(lat, lng);
    res.redirect('/'); 
})

/** GET REQUEST - REQUESTING DATA BASED ON COORDINATES */ 
app.get('/info', async (req, res) => {
    await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&forecast_days=5&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`)
        .then(response => {
            res.send(response.data);
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
    })
})

/** SERVER */ 
app.listen(port, () => {
    console.log("App is listening to port 3000")
});