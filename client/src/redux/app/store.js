import {configureStore} from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice';


//create store
const store = configureStore({
    reducer: {
        cartItems: cartReducer
    }
});

export default store;