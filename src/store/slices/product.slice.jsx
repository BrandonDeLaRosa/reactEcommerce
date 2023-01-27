import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            return action.payload
        },
        filteredPrice: (state, action) => {
            const { fromPrice, toPrice } = action.payload
            return state.filter(product => product.price >= Number(fromPrice) && product.price <= Number(toPrice))
        }
    }
})

export const getProductsThunk = () => dispatch => {
    // dispatch(setIsLoading(true))
    axios.get("https://e-commerce-api.academlo.tech/api/v1/products")
     .then(res => dispatch(setProducts(res.data.data.products)))
     .catch(error => console.log(error.response))
    //  .finally(() => dispatch(setIsLoading(false)))
}

// El parametro enviado desde home, debe contener la ruta correcta(category.id).
// Pero al recibirlo en el thunk esta ruta puede ser renombrada como quiera
export const filteredCategoryThunk = (id) => (dispatch) => {
    // dispatch(setIsLoading(true));
    return axios.get(`https://e-commerce-api.academlo.tech/api/v1/products/?category=${id}`)
        .then((res) => dispatch(setProducts(res.data.data.products)))
        // .finally(() => dispatch(setIsLoading(false)));
}

export const byNameThunk = (name) => (dispatch) => {
    // dispatch(setIsLoading(true));
    return axios.get(`https://e-commerce-api.academlo.tech/api/v1/products?query=${name}`)
        .then((res) => dispatch(setProducts(res.data.data.products)))
        // .finally(() => dispatch(setIsLoading(false)));
}

export const { setProducts, filteredPrice } = productsSlice.actions;

export default productsSlice.reducer;
