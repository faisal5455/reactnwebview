import { configureStore } from '@reduxjs/toolkit'
import { MyReducer } from "./Reducers";

const store = configureStore({
    reducer: {
        // Define a top-level state field named `todos`, handled by `todosReducer`
        MyReducer: MyReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export default store