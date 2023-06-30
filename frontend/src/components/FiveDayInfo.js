/** FIVE DAY INFO - FUNCTIONAL COMPONENT */

import weatherCodes from '../weatherCodes'
import {Container, TableContainer, Table, TableHead, TableBody, TableRow, TableCell} from '@mui/material'

export default function FiveDayInfo(props) {
    return(
        <Container>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Date</TableCell>
                            <TableCell align="left">Forecast</TableCell> 
                            <TableCell align="right">Description</TableCell> 
                            <TableCell align="right">Min Temperature (°C)</TableCell>
                            <TableCell align="right">Max Temperature (°C)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="left">{props.date[0]}</TableCell>
                            <TableCell align="center"><img src={weatherCodes[props.weathercode[0]].icon} alt="img0" width="50px"/></TableCell>
                            <TableCell align="right">{weatherCodes[props.weathercode[0]].description}</TableCell>
                            <TableCell align="right">{props.minTemp[0]}</TableCell>
                            <TableCell align="right">{props.maxTemp[0]}</TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="left">{props.date[1]}</TableCell>
                            <TableCell align="center"><img src={weatherCodes[props.weathercode[1]].icon} alt="img1" width="50px"/></TableCell>
                            <TableCell align="right">{weatherCodes[props.weathercode[1]].description}</TableCell>
                            <TableCell align="right">{props.minTemp[1]}</TableCell>
                            <TableCell align="right">{props.maxTemp[1]}</TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="left">{props.date[2]}</TableCell>
                            <TableCell align="center"><img src={weatherCodes[props.weathercode[2]].icon} alt="img2" width="50px"/></TableCell>
                            <TableCell align="right">{weatherCodes[props.weathercode[2]].description}</TableCell>
                            <TableCell align="right">{props.minTemp[2]}</TableCell>
                            <TableCell align="right">{props.maxTemp[2]}</TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="left">{props.date[3]}</TableCell>
                            <TableCell align="center"><img src={weatherCodes[props.weathercode[3]].icon} alt="img3" width="50px"/></TableCell>
                            <TableCell align="right">{weatherCodes[props.weathercode[3]].description}</TableCell>
                            <TableCell align="right">{props.minTemp[3]}</TableCell>
                            <TableCell align="right">{props.maxTemp[3]}</TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="left">{props.date[4]}</TableCell>
                            <TableCell align="center"><img src={weatherCodes[props.weathercode[4]].icon} alt="img4" width="50px"/></TableCell>
                            <TableCell align="right">{weatherCodes[props.weathercode[4]].description}</TableCell>
                            <TableCell align="right">{props.minTemp[4]}</TableCell>
                            <TableCell align="right">{props.maxTemp[4]}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>   
        </Container>  
    )
}