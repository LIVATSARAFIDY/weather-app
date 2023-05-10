import { Box, Grid } from '@mui/material'
import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import env from 'react-dotenv'
const HourlyForcast = () => {
    const chartContainer = useRef(null)
    const coords = useSelector(state => state.coords)
    const units = useSelector(state => state.uniteMeasure)
    useEffect( () => {
        (async () => {
            const dataFromApi = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&appid=${env.APPID_OPENWEATHER}&units=${units}`)
            const dataForecast = await dataFromApi.json()
            const currentDate = dayjs().format('YYYY-MM-DD')
            const dataTemperature = []
            const dataHumidity = []
            const dataWindSpeed = []
            const dataxAxis = []
            dataForecast.list.map( data => {
                const dateForecast = data.dt_txt.split(' ')
                if(dateForecast[0] === currentDate){
                    const xAxisElt = dateForecast[1].split(':')
                    dataTemperature.push(data.main.temp)
                    dataHumidity.push(data.main.humidity)
                    dataWindSpeed.push(data.wind.speed)
                    dataxAxis.push({
                        value:`${xAxisElt[0]}:${xAxisElt[1]} "${data.weather[0].description}"`
                    })
                }
            })

            const colors = ['#5470C6', '#91CC75', '#EE6666'];
            const myChart = echarts.init(chartContainer.current);
            myChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'cross'
                    }
                },
                grid: {
                    right: '20%'
                },
                toolbox: {
                    feature: {
                    // dataView: { show: true, readOnly: false },
                    // restore: { show: true },
                    saveAsImage: { show: true }
                    }
                },
                legend: {
                    data: ['Humidity', 'Wind speed', 'Temperature']
                },
                xAxis: [
                    {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    data: dataxAxis
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'Humidity',
                        position: 'right',
                        alignTicks: true,
                        axisLine: {
                            show: true,
                            lineStyle: {
                            color: colors[0]
                            }
                        },
                        axisLabel: {
                            formatter: '{value} %'
                        }
                    },
                    {
                        type: 'value',
                        name: 'Wind speed',
                        position: 'right',
                        alignTicks: true,
                        offset: 80,
                        axisLine: {
                            show: true,
                            lineStyle: {
                            color: colors[1]
                            }
                        },
                        axisLabel: {
                            formatter: `{value} ${units === 'metric' ? 'm/s' : 'mph'} `
                        }
                    },
                    {
                        type: 'value',
                        name: 'Temperature',
                        position: 'left',
                        alignTicks: true,
                        axisLine: {
                            show: true,
                            lineStyle: {
                            color: colors[2]
                            }
                        },
                        axisLabel: {
                            formatter: '{value} °C'
                        }
                    }
                ],
                series: [
                    {
                        name: 'Humidity',
                        type: 'bar',
                        data: dataHumidity
                    },
                    {
                        name: 'Wind speed',
                        type: 'bar',
                        yAxisIndex: 1,
                        data: dataWindSpeed
                    },
                    {
                        name: 'Temperature',
                        type: 'line',
                        yAxisIndex: 2,
                        data: dataTemperature
                    }
                ]
    
            });
        })()
    }, [coords,units])

    return (
        <>
            <Box>
                <h1>Hourly forecast</h1>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <div ref={chartContainer} style={{ width: '100%', height: '500px' }} ></div>
                    </Grid>
                </Grid>
            </Box>            
        </>
    )
}

export default HourlyForcast