/** WEATHER INFO - FUNCTIONAL COMPONENT */

// import {useState, useEffect} from 'react';
// import axios from 'axios';
// import weathercodes from '../weathercodes.json'

export default function WeatherInfo(props) {
    // const [data, setData] = useState({
    //     Temperature: '',
    //     Weathercode: '',
    //     Windspeed: ''
    // });

    // Get weather info from server & extract relevant data
    // useEffect(() => {
    //     axios.get(`${process.env.REACT_APP_URL}`)
    //         .then(response => {
    //             let data = response.data.current_weather;
    //             let weatherText = weathercodes[data.weathercode];
    //             setData({
    //                 Temperature: data.temperature,
    //                 Weathercode: weatherText, 
    //                 Windspeed: data.windspeed,
    //             })
    //         })     
    //         .catch(error => console.error(error))
    // }, [data]);

    return (
        <div>
            <p>{props.temperature}°C</p>
            <p>{props.weathercode}</p>
            <p>Windspeed: {props.windspeed}</p>
            {/* <p>{data.Temperature}°C</p> 
            <p>{data.Weathercode}</p>
            <p>Windspeed: {data.Windspeed}</p> */}
        </div>
    )
}



