import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import { apiSlice } from "./features/api/apiSlice";

export const store = configureStore({
    reducer:{
        // Adding the reducers for counter, auth, and users slices to the store
        counter: counterReducer,
        // Adding the apiSlice.reducer to the store's reducer for RTK Query
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    // Adding the apiSlice.middleware to the store's middleware for handling caching, invalidation, polling, and other features of RTK Query
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch