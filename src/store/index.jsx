import { configureStore } from '@reduxjs/toolkit'
import  productsSlice  from './slices/product.slice'

export default configureStore({
    reducer: {
        products: productsSlice
    }
})
