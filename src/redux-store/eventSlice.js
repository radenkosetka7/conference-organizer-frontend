import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import eventService from "../api/event.service.js";

export const createEvent = createAsyncThunk("conferences/createEvent", async ({value}, {rejectWithValue}) => {
    try {
        return await eventService.createEvent(value);
    } catch (err) {
        return rejectWithValue("Error while adding new model. Please try later.");
    }
});


export const getEvent = createAsyncThunk("events/getEvent", async ({value}, {rejectWithValue}) => {
    try {
        return await eventService.getEvent(value);
    } catch (err) {
        return rejectWithValue("There is some problem with getting data. Please try later.");
    }
});


export const deleteEvent = createAsyncThunk("events/deleteEvent", async ({id}, {rejectWithValue}) => {
    try {
        return await eventService.deleteEvent(id);
    } catch (err) {
        return rejectWithValue("Error while deleting model. Please try later.");
    }
});

export const updateEvent = createAsyncThunk("events/updateEvent", async ({
                                                                             id,
                                                                             value
                                                                         }, {rejectWithValue}) => {
    try {
        return await eventService.updateEvent(id, value);
    } catch (err) {
        return rejectWithValue("Error while updating model. Please try later.");
    }
});

export const createEventVisitor = createAsyncThunk("events/createEventVisitor", async ({value}, {rejectWithValue}) => {
    try {
        return await eventService.createEventVisitor(value);
    } catch (err) {
        return rejectWithValue("Error while adding new model. Please try later.");
    }
});


export const deleteEventVisitor = createAsyncThunk("events/deleteEventVisitor", async ({id}, {rejectWithValue}) => {
    try {
        return await eventService.deleteEventVisitor(id);
    } catch (err) {
        return rejectWithValue("Error while deleting model. Please try later.");
    }
});

const eventSlice = createSlice({
    name: "events",
    initialState: {
        eve: [],
    },
    reducers: [],
    extraReducers: {
        [createEvent.fulfilled]: (state, action) => {
            state.loading=false;
            state.error=null;
        },
        [createEvent.pending]: (state, action) => {
            state.loading = true;
        },
        [createEvent.rejected]: (state, action) => {
            state.loading = false;
        },
        [updateEvent.fulfilled]: (state, action) => {
            state.loading = false;
            state.error=null;
        },
        [updateEvent.pending]: (state, action) => {
            state.loading = true;
        },
        [updateEvent.rejected]: (state, action) => {
            state.loading = false;
        },
        [deleteEvent.fulfilled]: (state, action) => {
            state.loading=false;
        },
        [deleteEvent.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteEvent.rejected]: (state, action) => {
            state.loading = false;
        },
        [getEvent.fulfilled]: (state, action) => {
            state.loading=false;
        },
        [getEvent.pending]: (state, action) => {
            state.loading = true;
        },
        [getEvent.rejected]: (state, action) => {
            state.loading = false;
        },
        [createEventVisitor.fulfilled]: (state, action) => {
            state.loading=false;
            state.error=null;
        },
        [createEventVisitor.pending]: (state, action) => {
            state.loading = true;
        },
        [createEventVisitor.rejected]: (state, action) => {
            state.loading = false;
        },
        [deleteEventVisitor.fulfilled]: (state, action) => {
            state.loading=false;
            state.error=null;
        },
        [deleteEventVisitor.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteEventVisitor.rejected]: (state, action) => {
            state.loading = false;
        },
    },
});

export default eventSlice.reducer;