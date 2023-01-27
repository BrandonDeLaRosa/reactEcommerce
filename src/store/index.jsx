import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cart.slice'
import  productsSlice  from './slices/product.slice'
import  purchasesSlice  from './slices/purchases.slices'

export default configureStore({
    reducer: {
        products: productsSlice,
        purchases: purchasesSlice,
        cart: cartSlice
    }
})
