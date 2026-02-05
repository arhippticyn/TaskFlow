import { configureStore } from '@reduxjs/toolkit'
import { AuthReducer } from './AuthSlice'
import { TaskReducer } from './TasksSlice'

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        tasks: TaskReducer
    }
})