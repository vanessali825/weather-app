// IMPORT PACKAGES
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

// CREATE EXPRESS APP
const app = express();

// INITIALIZE MIDDLEWARE
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

// EMPTY VARIABLES
let lng;
let lat;

// GET REQUEST - INDEX PAGE
app.get('/', async (req, res) => {
    res.send('Hello world!')
})

// POST REQUEST - RECEIVE COORDINATE DATA FROM CLIENT 
app.post('/coordinates', async (req, res) => {
    const body = await req.body;
    // console.log(body);    
    lat = body.Lat;
    lng = body.Lng;
    console.log(lat, lng);
    res.redirect('/'); 
})

// GET REQUEST - REQUESTING DATA BASED ON COORDINATES
app.get('/general', async (req, res) => {
    await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`)
        .then(response => {
            res.send(response.data);
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
    })
})

// SERVER
const port = 8000;
app.listen(port, () => {
    console.log("App is listening to port 3000")
});