import { configureStore } from "@reduxjs/toolkit";
import applicationSlice from "../features/applicationSlice";
import userSlice from "../features/userSlice";
export const store = configureStore({
    reducer: {
        application: applicationSlice,
        users: userSlice
    }
})