import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    longitude:47.5373728,
    latitude:-18.9160344
}

export const coordsSlice = createSlice({
    name:'coords',
    initialState,
    reducers:{
        changeCoordsGeo: (state,action) => {
            state = {...action.payload}
            return state
        }
    }
})

export const {changeCoordsGeo} = coordsSlice.actions

export default coordsSlice.reducer