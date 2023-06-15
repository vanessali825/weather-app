/** SEARCH BAR - PURE COMPONENT */

import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import CurrentInfo from "./CurrentInfo";
import weatherCodes from '../weatherCodes';
import FiveDayInfo from "./FiveDayInfo";
import { Container, Box, Grid, Typography, TextField, Button } from '@mui/material';
import ScrollToTop from "react-scroll-to-top";

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
    
    // Auto-scroll set up
    const scrollRef = useRef(null);

    // Grab input value & update format on submit
    async function handleSubmit (e) {
        e.preventDefault();
        const input = e.target.input.value; // capture input information
        const newInput = input.replaceAll(",", "+")
        setLocation({
            String: `${newInput}`
        });
        if (scrollRef.current) {
          // Will scroll smoothly to the top of the next section
          scrollRef.current.scrollIntoView({ behavior: 'smooth' });    
        }   
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
            axios.post(`${process.env.REACT_APP_API_SERVER}/coordinates`, coordinates)
                .then(() => console.log(coordinates, 'Input delivered'))
                .then(() => setCount(count + 1))
                .catch((error) => console.log(error))
        }}
    , [coordinates]);
    
    // Get weather info from server & extract relevant data
    useEffect(() => {
        if (count !== 0) { // condition prevents this useEffect from mounting before actual call
          axios.get(`${process.env.REACT_APP_API_SERVER}/info`)
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
            <Container> 
               <Box 
                    display='flex'
                    flexDirection= 'column'
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                    minHeight='100vh'
                > 
                    <Typography variant='h4'>Where are we looking at today?</Typography> 
                    <form onSubmit={handleSubmit}>
                    <TextField 
                        sx={{minWidth: '350px', backgroundColor: 'white'}}
                        margin="dense"
                        type="text"
                        id="input"
                        placeholder="City, Country"
                    /> <br />
                    <Button type="submit" variant="contained" size='medium'>Search</Button>
                    </form> 
                </Box> 
            </Container>
            <Container>
                {data.CurrentTemperature !== '' ?
                    <Box>
                        <Typography variant="h5">Current Weather:</Typography>
                    </Box>
                    : null 
                }
            </Container>
            <Container ref={scrollRef}>
                <Grid container spacing={2} sx={{
                    paddingTop: '50px',
                    paddingBottom: '100px',
                }}>
                    <Grid item xs={6} sm={6} sx={{ 
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
                            <CurrentInfo 
                                temperature={data.CurrentTemperature}
                                weathercode={data.CurrentWeathercodeText}
                                windspeed={data.Windspeed}    
                            /> : null                            
                        }
                    </Grid>
                </Grid>            
            </Container>
            <Container>
                {data.CurrentTemperature !== '' ?
                    <Box>
                        <Typography variant="h5">Five-Day Weather Forecast:</Typography>
                    </Box>
                    : null 
                }
            </Container>
            <ScrollToTop /> 
                <Container>   
                    {data.CurrentTemperature !== '' ? 
                        <FiveDayInfo
                            date={data.Date}
                            weathercode={data.Weathercode}
                            minTemp={data.MinTemp}
                            maxTemp={data.MaxTemp}    
                        /> : null
                    }
                </Container>
        </>
    )
}

