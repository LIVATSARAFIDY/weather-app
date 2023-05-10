
import { Container } from '@mui/material';
import SearchBar from './components/search-bar';
import CurrentLocation from './components/CurrentLocation';
import HourlyForcast from './components/HourlyForcast';
import DaylyForeCast from './components/DaylyForcast';

const Map = () => {


  return (
    <Container sx={{
      width:'100%', 
      mr:{xs:0,lg:28},
      ml:{xs:0,lg:28}
    }}>
      <SearchBar />
      <CurrentLocation />
      <HourlyForcast  />
      <DaylyForeCast />
    </Container>
  );
};

export default Map;
