import { configureStore } from '@reduxjs/toolkit'
import newsReducer from './slices/newsSlice'
import categoriesReducer from './slices/categoriesSlice'

export const store = configureStore({
    reducer: {
        news: newsReducer,
        categories: categoriesReducer
    }
})