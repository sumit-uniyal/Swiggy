import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    cartItem:{}
}

const CartSlice = createSlice({
    name:'Cart',
    initialState:initialValue,
    reducers:{
        addToCart:(state,action)=>{
            let item = action.payload.id

            if (state.cartItem[item]) {
                state.cartItem[item] += 1;
            } else {
                state.cartItem[item] = 1;
            }
        
        },
        removeFromCart:(state,action)=>{
            let item = action.payload.id
            if(state.cartItem[item] > 1){
                state.cartItem[item] -= 1
            }else{
                delete state.cartItem[item]
            }
        },
        clearCart:(state)=>{
            state.cartItem = null
        }
    }
})

export const {addToCart , removeFromCart, clearCart} = CartSlice.actions
export default CartSlice.reducer