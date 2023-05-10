import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import coordsReducer from '../features/weather/coordsSlice';
import uniteMeasureReducer from '../features/weather/uniteMeasure';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    coords: coordsReducer,
    uniteMeasure: uniteMeasureReducer
  },
});
