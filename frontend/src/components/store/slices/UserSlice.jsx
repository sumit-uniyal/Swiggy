import {createSlice} from '@reduxjs/toolkit'

const initialValue = {
    email:null,
    isAdmin:false,
    userId:null
}

const userSlice = createSlice({
    name:'user',
    initialState:initialValue,
    reducers:{
        login:(state,action)=>{
            state.email = action.payload.email;
            state.isAdmin = action.payload.isAdmin;
            state.userId = action.payload.userId;
        },
        logout:(state)=>{
            state.email = null;
            state.isAdmin = false;
            state.userId = null;
        },
    }
})

export const {login, logout} = userSlice.actions
export default userSlice.reducer