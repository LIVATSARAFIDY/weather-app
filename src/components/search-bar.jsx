import { useState } from 'react';
import {ToggleButtonGroup, ToggleButton, Grid, IconButton, Typography } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import { useSelector, useDispatch } from 'react-redux';
import { changeUniteMeasure } from '../features/weather/uniteMeasure';

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  },
}));


const SearchBar = () => {
    const unitMeasure = useSelector(state => state.uniteMeasure)
    const dispatch = useDispatch()
    const handleChange = (event, nextView) => {
      dispatch(changeUniteMeasure(nextView))
    }
    return(
      <>
        <Grid container spacing={1}>
          {/* <Grid item xs={8}>
            <TextField
              fullWidth
              label="Search city"
              id="outlined-start-adornment"
              sx={{ mt: 1, mb:1 }}
            />
            
          </Grid> */}
          <Grid item xs={4}>
            <HtmlTooltip
              title={
                <>
                  <Typography color="inherit">Information</Typography>
                    Vous pouvez cliquer sur la carte pour afficher la météo du zone clicker <br/>
                    Vous pouvez faire un recherche par nom de ville sur la zone de recherche, en suite cliquez sur une zone de 
                    la carte <br/>
                    Cette application utilise la librairie Mapbox-gl pour afficher la carte et le plugins MapboxGeocoder
                    pour la fonctionnalité de geocoding "Rechereche par nom de ville"<br/>
                    Cette application utilise la formule gratuite de l'api openweathermap pour collecter les données<br />
                    La formule gratuite ne permet que de collecter les donnée du jours, la prévision par interval de 3 heures du jour<br />
                    et la prevision sur 5 jours par 3 heures

                </>
              }
            >
              <IconButton>
                <InfoIcon  sx={{ fontSize: 60, position:'relative', bottom:8 }} />
              </IconButton>
            </HtmlTooltip>
            
            <ToggleButtonGroup
              value={unitMeasure}
              exclusive
              aria-label="text alignment"
              sx={{ mt: 1, mb:1 }}
              onChange={handleChange}
            >
              <ToggleButton value="metric" size='large'  aria-label="left aligned">
                <img src="/image/thermometer-c.svg" />
              </ToggleButton>
              <ToggleButton value="imperial" size='large' aria-label="centered">
                <img src="/image/thermometer-f.svg" />
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>  
      </>
    )
}

export default SearchBar