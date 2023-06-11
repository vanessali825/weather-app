/** SEARCH BAR - PURE COMPONENT */

import { useState, useEffect } from "react";
import axios from 'axios';
import CurrentInfo from "./CurrentInfo";
import weatherCodes from '../weatherCodes';
import FiveDayInfo from "./FiveDayInfo";
import {Container, Box, Grid, Button} from '@mui/material'

export default function SearchBar(){
    // Capture location state
    const [location, setLocation] = useState({
        String: ''
    });

    // Capture coordinate state
    const [coordinates, setCoordinates] = useState({
        Lat: '',
        Lng: ''
    })

    // Capture count state
    const [count, setCount] = useState(0)

    // Capture weather data based on specified coordinates
    const [data, setData] = useState({
        CurrentTemperature: '',
        CurrentWeathercode: '',
        CurrentWeathercodeText: '',
        Windspeed: '',
        Date: [],
        Weathercode: [],
        MaxTemp: [],
        MinTemp: [],
    });
    
    // Grab input value & update format on submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const input = e.target.input.value; // capture input information
        const newInput = input.replaceAll(",", "+")
        setLocation({
            String: `${newInput}`
        });
    }

    // Effect when location state is updated; pull lat + lng coordinate information
    useEffect(() => {
        if (location.String !== '') { // condition prevents this useEffect from mounting before actual call
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location.String}&key=${process.env.REACT_APP_API_KEY}`) 
                .then(response => {
                    let data = response.data.results[0].geometry.location;
                    setCoordinates({
                        Lat: data.lat,
                        Lng: data.lng
                    })
                })
                .catch(error => {console.log(error)})   
        }
    },[location])
    
    // Effect when coordinates state is updated; post coordinate info to server
    useEffect(() => {
        if (coordinates.Lat !== '') { // condition prevents this useEffect from mounting before actual call
            axios.post(`${process.env.REACT_APP_URL}/coordinates`, coordinates)
                .then(() => console.log(coordinates, 'Input delivered'))
                .then(() => setCount(count + 1))
                .catch((error) => console.log(error))
        }}
    , [coordinates]);
    
    // Get weather info from server & extract relevant data
    useEffect(() => {
        if (count !== 0) { // condition prevents this useEffect from mounting before actual call
          axios.get(`${process.env.REACT_APP_URL}/info`)
                .then(async response => {
                    let data = response.data;
                    let weatherText = weatherCodes[data.current_weather.weathercode].description;
                    setData({
                        CurrentTemperature: data.current_weather.temperature,
                        CurrentWeathercode: data.current_weather.weathercode,
                        CurrentWeathercodeText: weatherText, 
                        Windspeed: data.current_weather.windspeed,
                        Date: data.daily.time,
                        Weathercode: data.daily.weathercode,
                        MaxTemp: data.daily.temperature_2m_max,
                        MinTemp: data.daily.temperature_2m_min,
                    })
                    console.log(data.current_weather.temperature, data.current_weather.weathercode, weatherText, data.current_weather.windspeed, data.daily.time, data.daily.weathercode, data.daily.temperature_2m_max, data.daily.temperature_2m_min);                    
                })     
                .catch(error => console.error(error))
            }}, [count]);

    return(
        <>
            <Container sx={{height:'500px'}}> 
               <Box sx={{
                    margin: 'auto', 
                    textAlign: 'center',
                    paddingTop: '200px',
                    paddingBottom: '200px',
                    backgroundColor:'' // TBD
                }}> 
                    <h2>Where are we looking at today?</h2> 
                    <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        id="input"
                        placeholder="City, Country"
                    />
                    <Button type="submit" >Search</Button>
                    </form> 
                </Box> 
            </Container>
            <Container>
                <Grid container spacing={2} sx={{
                    paddingTop: '100px',
                    paddingBottom: '100px',
                }}>
                    <Grid item xs={6} sm={6} sx={{ // do I need to adjust the breakpoints?
                        margin: 'auto',
                        textAlign: 'center'
                    }}>
                        {data.CurrentTemperature !== '' ?
                            <img src={weatherCodes[data.CurrentWeathercode].icon} width="100px"/>
                            : null 
                        }
                        
                    </Grid>
                    <Grid item xs={6} sm={6} sx={{
                        margin: 'auto', 
                        textAlign: 'center',
                    }}> 
                        {data.CurrentTemperature !== '' ?
                            <h4>Current Weather:</h4> : null
                        }
                        {data.CurrentTemperature !== '' ? 
                            <CurrentInfo 
                                temperature={data.CurrentTemperature}
                                weathercode={data.CurrentWeathercodeText}
                                windspeed={data.Windspeed}    
                            /> : null
                            
                        }
                    </Grid>
                </Grid>
            </Container>
                {data.CurrentTemperature !== '' ? 
                    <FiveDayInfo
                        date={data.Date}
                        weathercode={data.Weathercode}
                        minTemp={data.MinTemp}
                        maxTemp={data.MaxTemp}    
                    /> : null
                }
        </>
    )
}

