import { createSlice } from '@reduxjs/toolkit';
// import { setIsLoading } from './isLoading.slice';
import axios from 'axios';
import getConfig from '../../utils/getConfig';

export const cartProductsSlice = createSlice({
    name: 'cartProducts',
    initialState: [],
    reducers: {
        setCartProducts: (state, action) => {
            return action.payload
        }, 
    }
})

export const getCartProductsThunk = () => (dispatch) => {
    // dispatch(setIsLoading(true));
    // Las rutas protegidas deben cruzar con getConfing
    return axios.get("https://e-commerce-api.academlo.tech/api/v1/cart", getConfig())
        // .then((res) => dispatch(setCartProducts(res.data)))
        .then((res) => dispatch(setCartProducts(res.data.data.cart.products)))
        .catch(error => console.log(error.response))
        // .finally(() => dispatch(setIsLoading(false)));
}

export const addCartThunk = (productos) => (dispatch) => {
    // dispatch(setIsLoading(true));
    return axios.post("https://e-commerce-api.academlo.tech/api/v1/cart", productos, getConfig())
        .then((res) => dispatch(getCartProductsThunk()))
        // .finally(() => dispatch(setIsLoading(false)));
}

export const deleteProductThunk = (id) => (dispatch) => {
    // dispatch(setIsLoading(true));
    return axios.delete(`https://e-commerce-api.academlo.tech/api/v1/cart/${id}`,getConfig())
        .then(() => dispatch(getCartProductsThunk()))
        .catch(error => console.log(error.response))
        // .finally(() => dispatch(setIsLoading(false)));
}

export const checkoutCartThunk = () => (dispatch) => {
    // dispatch(setIsLoading(true));
    return axios.post("https://e-commerce-api.academlo.tech/api/v1/purchases", {}, getConfig())
        .then(() => dispatch(setCartProducts([])))
        .catch(error => console.log(error.response))
        // .finally(() => dispatch(setIsLoading(false)));
}
export const { setCartProducts } = cartProductsSlice.actions;

export default cartProductsSlice.reducer;
