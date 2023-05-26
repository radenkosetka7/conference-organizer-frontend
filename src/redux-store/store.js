import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import eventSlice from "./eventSlice";
import conferenceSlice from "./conferenceSlice";
import utilSlice from "./utilSlice";


export const store = configureStore({
    reducer:{
        users:userSlice,
        conferences:conferenceSlice,
        events:eventSlice,
        utils:utilSlice,
    }
})