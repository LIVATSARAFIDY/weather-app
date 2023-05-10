import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import dayjs from 'dayjs';
import 'dayjs/locale/fr'; 
import * as localizedFormat from 'dayjs/plugin/localizedFormat';
import Map from './MapWeather'
import env from "react-dotenv"

const CurrentLocation = () => {

    const coords = useSelector( state => state.coords ) 
    console.log('coords = ',coords)
    const units = useSelector( state => state.uniteMeasure )
    
    dayjs.extend(localizedFormat);
    const currentDate = dayjs().locale('fr').format('lll')


    const [currentPlaceName,setCurrentPlaceName] = useState('');
    const [temperature,setTemperature] = useState(0)
    const [icon,setIcon] = useState('')
    const [description,setDescription] = useState('')
    const [humidity,setHumidity] = useState(0)
    const [Visibility,setVisibility] = useState(0)
    const [pressure,setPressure] = useState(0)
    const [speedWind,setSpeedWind] = useState(0)
    const [directionWind,setDirectionWind] = useState(0)
    const [sunrise,setSunrise] = useState('')
    const [sunset,setSunset] = useState('')
    useEffect(() => {
        ( async () => {
            const weatherData = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${env.APPID_OPENWEATHER}&units=${units}`,
                {
                    method:'GET'
                }
            )
            const data = await weatherData.json()
            // console.log('data = ',data)
            const sunriseUnixTimestamp = new Date(data.sys.sunrise * 1000) 
            const sunsetUnixTimestamp = new Date(data.sys.sunset * 1000)
            let hoursSunrise = ''+sunriseUnixTimestamp.getHours()
            let minuteSunrise = ''+sunriseUnixTimestamp.getMinutes()
            let hoursSunset = ''+sunsetUnixTimestamp.getHours()
            let minuteSunset = ''+sunsetUnixTimestamp.getMinutes()

            hoursSunrise = hoursSunrise.length === 1 ? '0'+hoursSunrise : hoursSunrise
            minuteSunrise = minuteSunrise.length === 1 ? '0'+minuteSunrise : minuteSunrise
            hoursSunset = hoursSunset.length === 1 ? '0'+hoursSunset : hoursSunset
            minuteSunset = minuteSunset.length === 1 ? '0'+minuteSunset : minuteSunset

            setCurrentPlaceName(data.name)
            setTemperature(data.main.temp)
            setIcon(data.weather[0].icon)
            setDescription(data.weather[0].description)
            setHumidity(data.main.humidity)
            setVisibility(data.visibility)
            setPressure(data.main.pressure)
            setSpeedWind(data.wind.speed)
            setDirectionWind(data.wind.deg)
            setSunrise(`${hoursSunrise}h:${minuteSunrise}mn`)
            setSunset(`${hoursSunset}h:${minuteSunset}mn`)
        })()
                
    }, [units,coords]);

    return (
        <Box>
            <Grid container spacing={1}>
                
                <Grid item xs={12} lg={6}>
                {
                    (coords.latitude !== 0 && coords.longitude !== 0) ? (
                        
                        <>
                            <small style={{color:'red'}}>{currentDate}</small><br />
                            <strong>{ currentPlaceName }</strong>
                            <Box>
                                <img src={`/image/${icon}.png`} style={{float:'left'}} />
                                <span style={{fontSize: '36px',fontWeight: 900,marginTop: '41px',display: 'inline-block'}}>
                                    { temperature} { units === 'metric' ? '°C' : '°F'} 
                                </span>
                                <div>
                                    {description}<br/><br/>
                                </div>
                            </Box>
                            <Box>
                                 <Grid container spacing={1}>
                                    <Grid item ><img src="/image/humidity.svg" style={{position:"relative", top:"14px"}} />Humidity: {humidity}%</Grid>
                                    <Grid item><img src="/image/eye.svg" style={{position:"relative", top:"14px"}} />Visibility: {Math.round(Visibility/1000)} km</Grid>
                                    <Grid item ><img src="/image/pressure-meter.svg" style={{position:"relative", top:"14px"}} />Pressure: {pressure} hPa<br/></Grid>
                                    <Grid item ><img src="/image/wind.svg" style={{position:"relative", top:"14px"}} />Wind speed: {speedWind} { units === 'metric' ? 'm/s' : 'mph'}<br/></Grid>
                                    <Grid item ><img src="/image/wind-direction.svg" style={{position:"relative", top:"14px"}} />Wind direction: {directionWind}°<br/></Grid>
                                    <Grid item ><img src="/image/sunrise.svg" style={{position:"relative", top:"14px"}} />Sunrise: {sunrise}<br/></Grid>
                                    <Grid item ><img src="/image/sunset.svg" style={{position:"relative", top:"14px"}} />Sunset: {sunset}<br/></Grid>
                                </Grid>
                            </Box>
                        </>
                        
                    ):<></>
                } 
                    
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Map />
                </Grid>
            </Grid>
            
        </Box>
    )
}

export default CurrentLocation