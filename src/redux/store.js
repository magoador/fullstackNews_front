import { configureStore } from '@reduxjs/toolkit'
import newsReducer from './slices/newsSlice'
import categoriesReducer from './slices/categoriesSlice'
import usersReducer from './slices/usersSlice'

export const store = configureStore({
    reducer: {
        news: newsReducer,
        categories: categoriesReducer,
        users: usersReducer
    }
})