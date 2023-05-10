import { createSlice } from '@reduxjs/toolkit';

const initialState = 'metric'
//metric => celcius
// standard => fahrenheit

export const uniteMeasureSlice = createSlice({
    name:'uniteMeasure',
    initialState,
    reducers:{
        changeUniteMeasure: (state,action) => {
            state = action.payload
            return state
        }
    }
})

export const {changeUniteMeasure} = uniteMeasureSlice.actions

export default uniteMeasureSlice.reducer