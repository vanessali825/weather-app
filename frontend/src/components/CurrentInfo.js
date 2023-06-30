/** WEATHER INFO - FUNCTIONAL COMPONENT */
import { Typography } from '@mui/material'

export default function CurrentInfo(props) {
    return (
        <div>
            <Typography variant='h6'>{props.temperature}°C</Typography>
            <Typography variant='h6'>{props.weathercode}</Typography>
            {/* <Typography variant='h6'>Windspeed: {props.windspeed}</Typography> */}
        </div>
    )
}



