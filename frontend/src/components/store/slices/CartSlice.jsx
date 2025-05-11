import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCart = createAsyncThunk('cart/fetchCart',async (_, { rejectWithValue }) => {
    try {
      const base_url = import.meta.env.VITE_BASE_URL;
      const response = await axios.get(`${base_url}api/cart/get`, {
        withCredentials: true,
      });
      return response.data.data || {};
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch cart");
    }
  }
);


const initialValue = {
    cartItem:{}
}

let debouncerTimer;

const updateCartDataApi = (cartData)=>{
    clearTimeout(debouncerTimer);
    debouncerTimer = setTimeout(async()=>{
        try {
            const base_url = import.meta.env.VITE_BASE_URL
            await axios.post(`${base_url}api/cart/add`,
                { cart: cartData },
                { withCredentials: true }
            );
            console.log("Cart data sent to backend");
        } catch (error) {
            console.error("Error saving cart:"+error);
        }
    },2000)
}

const CartSlice = createSlice({
    name:'Cart',
    initialState:initialValue,
    reducers:{
        addToCart:(state,action)=>{
            let item = action.payload.id
            console.log("Add to cart called with ID:", item);
            if (state.cartItem[item]) {
                state.cartItem[item] += 1;
            } else {
                state.cartItem[item] = 1;
            }
            updateCartDataApi({ ...state.cartItem })
        },
        removeFromCart:(state,action)=>{
            let item = action.payload.id
            if(state.cartItem[item] > 1){
                state.cartItem[item] -= 1
            }else{
                delete state.cartItem[item]
            }
            updateCartDataApi({ ...state.cartItem })
        },
        clearCart:(state)=>{
            state.cartItem = {}
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cartItem = action.payload;
        })
        .addCase(fetchCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
})

export const {addToCart , removeFromCart, clearCart} = CartSlice.actions
export default CartSlice.reducer