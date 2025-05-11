import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
const initialValue = {
    food_list: [],
    status:'idle',
    error:null
}

export const apiData = createAsyncThunk('api/food',async(_,{rejectWithValue})=>{
    try {
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const URL = `${BASE_URL}api/food/get`;
        const response = await axios.get(URL);
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

const foodSlice = createSlice({
    name:"food",
    initialState:initialValue,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
        .addCase(apiData.pending, (state) => {
            state.status = "loading";
        })
        .addCase(apiData.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.food_list = action.payload;
        })
        .addCase(apiData.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });
    }
})

export default foodSlice.reducer