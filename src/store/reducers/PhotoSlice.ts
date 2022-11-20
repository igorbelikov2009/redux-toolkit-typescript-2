import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPhoto } from "../../models/types";

interface IPhotoState {
  photos: IPhoto[];
  isLoading: boolean;
  error: string;
}

const initialState: IPhotoState = {
  photos: [],
  isLoading: false,
  error: "",
};

export const photoSlice = createSlice({
  name: "photo",
  initialState: initialState,
  reducers: {
    photosFetching(state) {
      state.isLoading = true;
    },
    photosFetchingSuccess(state, action: PayloadAction<IPhoto[]>) {
      state.isLoading = false;
      state.photos = action.payload;
      state.error = "";
    },
    photosFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default photoSlice.reducer;
