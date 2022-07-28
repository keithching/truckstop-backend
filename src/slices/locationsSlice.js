import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// This is built using redux toolkit for state management.
// Read the documentation to understand this file: https://redux-toolkit.js.org/

export const fetchLocations = createAsyncThunk(
  "locations/fetchLocations",
  async () => {
    const { data: response } = await axios.get("/api/locations");
    return response;
  }
);

const initialState = [];

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    // Add your reducers here. Read about slices and reducers here: https://redux.js.org/tutorials/fundamentals/part-8-modern-redux#writing-slices
  },
  extraReducers: {
    [fetchLocations.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export default locationsSlice.reducer;
