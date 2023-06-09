/** SEARCH BAR - PURE COMPONENT */

import { useState, useEffect } from "react";
import axios from 'axios';
import WeatherInfo from "./WeatherInfo";
import weatherCodes from '../weatherCodes.json'

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

    // Capture weather data based on specified coordinates
    const [data, setData] = useState({
        Temperature: '',
        Weathercode: '',
        Windspeed: ''
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
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location.String}&key=${process.env.REACT_APP_API_KEY}`) 
            .then(response => {
                let data = response.data.results[0].geometry.location;
                setCoordinates({
                    Lat: data.lat,
                    Lng: data.lng
                })
            })
            .catch(error => {console.log(error) })   
        },[location])
    
    // Effect when coordinates state is updated; post coordinate info to server
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_URL}/coordinates`, coordinates)
            // .then(() => console.log(coordinates, 'Input delivered'))
            .catch((error) => console.log(error))
    }, [coordinates]);

    // Get weather info from server & extract relevant data
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}`)
            .then(response => {
                let data = response.data.current_weather;
                let weatherText = weatherCodes[data.weathercode];
                console.log(data.temperature, weatherText, data.windspeed)
                setData({
                    Temperature: data.temperature,
                    Weathercode: weatherText, 
                    Windspeed: data.windspeed,
                })
            })     
            .catch(error => console.error(error))
    }, [data]);

    return(
        <div>
            <p>Where are we looking at today?</p>            
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    id="input"
                    placeholder="City, Country"
                />
                <button type="submit">Search</button>
            </form>
            {data.Temperature != '' ? 
                <WeatherInfo 
                    temperature={data.Temperature}
                    weathercode={data.Weathercode}
                    windspeed={data.Windspeed}    
                /> : null
            }
        </div>
    )
}

