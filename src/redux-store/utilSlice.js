import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import locationService from "../api/location.service.js";
import ratingService from "../api/rating.service.js";
import reserved_itemsService from "../api/reserved_items.service.js";
import event_typeService from "../api/event_type.service";


export const getLocations = createAsyncThunk("utils/getAllLocations", async ({rejectWithValue}) => {
    try {
        return await locationService.getAllLocations();
    } catch (err) {
        return rejectWithValue("There is some problem with getting data. Please try later.");
    }
});

export const getEventTypes = createAsyncThunk("utils/getEventTypes", async ({rejectWithValue}) => {
    try {
        return await event_typeService.getAllEventTypes();
    } catch (err) {
        return rejectWithValue("There is some problem with getting data. Please try later.");
    }
});

export const createRating = createAsyncThunk("utils/createRating", async ({value}, {rejectWithValue}) => {
    try {
        return await ratingService.createRating(value);
    } catch (err) {
        return rejectWithValue("Error while adding new model. Please try later.");
    }
});


export const createReservedItem = createAsyncThunk("utils/createReservedItem", async ({value}, {rejectWithValue}) => {
    try {
        return await reserved_itemsService.createReservedItem(value);
    } catch (err) {
        return rejectWithValue("Error while adding new model. Please try later.");
    }
});


export const updateReservedItem = createAsyncThunk("utils/updateReservedItem", async ({
                                                                                          id,
                                                                                          value
                                                                                      }, {rejectWithValue}) => {
    try {
        return await reserved_itemsService.updateReservedItem(id, value);
    } catch (err) {
        return rejectWithValue("Error while updating model. Please try later.");
    }
});


export const deleteReservedItem = createAsyncThunk("utils/deleteReservedItem", async ({id}, {rejectWithValue}) => {
    try {
        return await reserved_itemsService.deleteReservedItem(id);
    } catch (err) {
        return rejectWithValue("Error while deleting model. Please try later.");
    }
});

const utilSlice = createSlice({
    name: "utils",
    initialState: {
        locations: [],
        eventTypes: [],
    },
    reducers: {},
    extraReducers: {
        [getLocations.fulfilled]: (state, action) => {
            state.loading = false;
            state.locations = action.payload;
        },
        [getLocations.pending]: (state, action) => {
            state.loading = true;
        },
        [getLocations.rejected]: (state, action) => {
            state.loading = false;
        },
        [createRating.fulfilled]: (state, action) => {
            return [...state, action.payload];
        },
        [createRating.pending]: (state, action) => {
            state.loading = true;
        },
        [createRating.rejected]: (state, action) => {
            state.loading = false;
        },
        [createReservedItem.fulfilled]: (state, action) => {
            return [...state, action.payload];
        },
        [createReservedItem.pending]: (state, action) => {
            state.loading = true;
        },
        [createReservedItem.rejected]: (state, action) => {
            state.loading = false;
        },
        [updateReservedItem.fulfilled]: (state, action) => {
            const data = action.payload;
            return state.map((el) => (el.id === data.id ? {...el, ...data} : el));
        },
        [updateReservedItem.pending]: (state, action) => {
            state.loading = true;
        },
        [updateReservedItem.rejected]: (state, action) => {
            state.loading = false;
        },
        [deleteReservedItem.fulfilled]: (state, action) => {
            return state.filter((el) => el.id !== action.payload);
        },
        [deleteReservedItem.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteReservedItem.rejected]: (state, action) => {
            state.loading = false;
        },
        [getEventTypes.fulfilled]: (state, action) => {
            state.loading = false;
            state.eventTypes = action.payload;
        },
        [getEventTypes.pending]: (state, action) => {
            state.loading = true;
        },
        [getEventTypes.rejected]: (state, action) => {
            state.loading = false;
        },
    }
})

export default utilSlice.reducer;
