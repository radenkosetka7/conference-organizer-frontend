import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import conferenceService from "../api/conference.service.js";

export const getAllConferences = createAsyncThunk("conferences/getAllConferences", async ({rejectWithValue}) => {
    try {
        return await conferenceService.getAllConferences();
    } catch (err) {
        return rejectWithValue("There is some problem with getting data. Please try later.");
    }
});
export const createConference = createAsyncThunk("conferences/createConference", async ({value}, {rejectWithValue}) => {
    try {
        return await conferenceService.createConference(value);
    } catch (err) {
        return rejectWithValue("Error while adding new model. Please try later.");
    }
});

export const getConference = createAsyncThunk("conferences/getConference", async ({value}, {rejectWithValue}) => {
    try {
        return await conferenceService.getConference(value);
    } catch (err) {
        return rejectWithValue("There is some problem with getting data. Please try later.");
    }
});


export const deleteConference = createAsyncThunk("conferences/deleteConference", async ({id}, {rejectWithValue}) => {
    try {
        return await conferenceService.deleteConference(id);
    } catch (err) {
        return rejectWithValue("Error while deleting model. Please try later.");
    }
});

export const updateConference = createAsyncThunk("conferences/updateConference", async ({
                                                                                            id,
                                                                                            value
                                                                                        }, {rejectWithValue}) => {
    try {
        return await conferenceService.updateConference(id, value);
    } catch (err) {
        return rejectWithValue("Error while updating model. Please try later.");
    }
});

export const getConferenceModerator = createAsyncThunk("conferences/getConferencesModerator", async ({rejectWithValue}) => {
    try {
        return await conferenceService.getAllModeratorConferences();
    } catch (err) {
        return rejectWithValue("There is some problem with getting data. Please try later.");
    }
});

export const getConferenceOrganizer = createAsyncThunk("conferences/getConferencesOrganizer", async ({rejectWithValue}) => {
    try {
        return await conferenceService.getAllOrganizerConferences();
    } catch (err) {
        return rejectWithValue("There is some problem with getting data. Please try later.");
    }
});

const setConference = (state, action) =>
{
    state.selectedConf = action.payload;
}

export const getConferencesVisitor = createAsyncThunk("conferences/getConferencesVisitor", async ({rejectWithValue}) => {
    try {
        return await conferenceService.getAllVisitorConferences();
    } catch (err) {
        return rejectWithValue("There is some problem with getting data. Please try later.");
    }
});


const conferenceSlice = createSlice({
    name: "conferences",
    initialState: {
        confs: [],
        selectedConf: null,
    },
    reducers: {
        setSelectedConference: setConference,
    },
    extraReducers: {
        [getAllConferences.fulfilled]: (state, action) => {
            state.loading = false;
            state.confs = action.payload;
        },
        [getAllConferences.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllConferences.rejected]: (state, action) => {
            state.loading = false;
        },
        [createConference.fulfilled]: (state, action) => {
            return [...state, action.payload];
        },
        [createConference.pending]: (state, action) => {
            state.loading = true;
        },
        [createConference.rejected]: (state, action) => {
            state.loading = false;
        },
        [updateConference.fulfilled]: (state, action) => {
            const data = action.payload;
            return state.map((el) => (el.id === data.id ? {...el, ...data} : el));
        },
        [updateConference.pending]: (state, action) => {
            state.loading = true;
        },
        [updateConference.rejected]: (state, action) => {
            state.loading = false;
        },
        [deleteConference.fulfilled]: (state, action) => {
            return state.filter((el) => el.id !== action.payload);
        },
        [deleteConference.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteConference.rejected]: (state, action) => {
            state.loading = false;
        },
        [getConference.fulfilled]: (state, action) => {
            return state.filter((el) => el.id === action.payload);
        },
        [getConference.pending]: (state, action) => {
            state.loading = true;
        },
        [getConference.rejected]: (state, action) => {
            state.loading = false;
        },
        [getConferenceModerator.fulfilled]: (state, action) => {
            return action.payload;
        },
        [getConferenceModerator.pending]: (state, action) => {
            state.loading = true;
        },
        [getConferenceModerator.rejected]: (state, action) => {
            state.loading = false;
        },
        [getConferencesVisitor.fulfilled]: (state, action) => {
            return action.payload;
        },
        [getConferencesVisitor.pending]: (state, action) => {
            state.loading = true;
        },
        [getConferencesVisitor.rejected]: (state, action) => {
            state.loading = false;
        },
        [getConferenceOrganizer.fulfilled]: (state, action) => {
            return action.payload;
        },
        [getConferenceOrganizer.pending]: (state, action) => {
            state.loading = true;
        },
        [getConferenceOrganizer.rejected]: (state, action) => {
            state.loading = false;
        },
    },

});

export const {setSelectedConference} = conferenceSlice.actions;
export default conferenceSlice.reducer;