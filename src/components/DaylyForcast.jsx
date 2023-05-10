import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dayjs from 'dayjs';
import env from 'react-dotenv'
const DaylyForeCast = () => {
    // interval hours [0-3] [3-6] [6-9] [9-12] [12-15] [15-18] [19-21] [21-24]
    const [expanded, setExpanded] = useState(false);
    const [forecast,setForecast] = useState(null)
    useEffect( () => {
        (async ()=>{
            const dataFromApi = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=-18.9160344&lon=47.5373728&appid=${env.APPID_OPENWEATHER}&units=metric`)
            const dataForecast = await dataFromApi.json()
            
            const dataWichDays = [] 
            let weather
            dataForecast.list.map( data => {
                const itemDate = data.dt_txt.split(' ')
                const daysFound = dataWichDays.find(days => days.date === itemDate[0])
                const dayOfTheWeek = dayjs(itemDate[0]).format('ddd MMM DD')
                
                const currentDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
                
                const hourForecast = parseInt(itemDate[1].split(':')[0])
                if(itemDate[0] === currentDate.split(' ')[0]){
                   
                    if(hourForecast === 0 ){
                        weather = {
                            description: data.weather[0].description,
                            icon: data.weather[0].icon
                        }
                    }
                    else if(hourForecast === 3){
                        weather = {
                            description: data.weather[0].description,
                            icon: data.weather[0].icon
                        }
                    }
                    else if(hourForecast === 6){
                        weather = {
                            description: data.weather[0].description,
                            icon: data.weather[0].icon
                        }
                    }
                    else if(hourForecast === 9){
                        weather = {
                            description: data.weather[0].description,
                            icon: data.weather[0].icon
                        }
                    }
                    else if(hourForecast === 12 ){
                        weather = {
                            description: data.weather[0].description,
                            icon: data.weather[0].icon
                        }
                    }
                    else if(hourForecast === 15){
                        weather = {
                            description: data.weather[0].description,
                            icon: data.weather[0].icon
                        }
                    }
                    else if(hourForecast === 18){
                        weather = {
                            description: data.weather[0].description,
                            icon: data.weather[0].icon
                        }
                    }
                    else if(hourForecast === 21){
                        weather = {
                            description: data.weather[0].description,
                            icon: data.weather[0].icon
                        }
                    }
                }
                else{
                    if(hourForecast === 12){
                        weather = {
                            description: data.weather[0].description,
                            icon: data.weather[0].icon
                        }
                    }
                    else{
                        // weather= {
                        //     description: data.weather[0].description,
                        //     icon: data.weather[0].icon
                        // }
                    }
                }
                if(!daysFound){
                    dataWichDays.push(
                        {
                            date:itemDate[0],
                            dayOfTheWeek:dayOfTheWeek,
                            temp:[data.main.temp],
                            tempMax:[data.main.temp_max],
                            tempMin:[data.main.temp_min],
                            pressure:[data.main.pressure],
                            weather:weather
                        }
                    )
                }
                else{
                    daysFound.temp.push(data.main.temp)
                    daysFound.tempMax.push(data.main.temp_max)
                    daysFound.tempMin.push(data.main.temp_min)
                    daysFound.pressure.push(data.main.pressure)
                }
            } )
            // console.log('dataWichDays = ',dataWichDays)
            setForecast(dataWichDays)
        })()
    }, [])

    const handleChange = (panel) => {
        setExpanded(!expanded)
    };


    return (
        <Box>
            <h3>Dayly forecast</h3>
            {
                forecast ? forecast.map( (data,index) => {
                    return (
                        <Accordion key={index} expanded={expanded} onChange={() => handleChange('panel1')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    { data.dayOfTheWeek }
                                </Typography>
                                <img src={`/image/${data.weather?.icon}.png`} style={{width:'30px',position:'relative',bottom:'7px'}} />
                                <Typography sx={{ color: 'text.secondary' }}>
                                    {Math.max(...data.tempMax)}°C / { Math.min(...data.tempMin)}°C
                                </Typography> &nbsp;&nbsp;&nbsp;&nbsp;
                                <Typography sx={{ color: 'text.secondary' }}>
                                    { data.weather?.description }
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    The high will be {Math.max(...data.tempMax)}°C, the low will be {Math.min(...data.tempMin)}°C.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    )
                }) : <></>
            }
        </Box>
    )
}

export default DaylyForeCast