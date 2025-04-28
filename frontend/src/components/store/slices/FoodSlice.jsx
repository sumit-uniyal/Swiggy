import { createSlice } from '@reduxjs/toolkit';
import { food_list } from '../../../assets/assets';

const initialValue = {
    food_list: food_list,
}

const foodSlice = createSlice({
    name:"food",
    initialState:initialValue,
    reducers:{

    }
})

export default foodSlice.reducer