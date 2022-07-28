import { configureStore } from "@reduxjs/toolkit";

import locationsReducer from "../slices/locationsSlice";

export default configureStore({
  reducer: {
    locations: locationsReducer,
  },
});
