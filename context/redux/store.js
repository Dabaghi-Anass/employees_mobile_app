import { configureStore } from '@reduxjs/toolkit'
import cityReducer from './cityReducer'
export default configureStore({
    reducer: {
        city : cityReducer
    },
})

