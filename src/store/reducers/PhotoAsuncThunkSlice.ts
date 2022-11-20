import { IPhoto } from "./../../models/types";
import { fetchAsyncThunkPhotos } from "./ActionCreater";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const photoAsuncThunkSlice = createSlice({
  name: "photoAsyncThunk",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchAsyncThunkPhotos.fulfilled.type]: (state, action: PayloadAction<IPhoto[]>) => {
      state.isLoading = false;
      state.photos = action.payload;
      state.error = "";
    },
    [fetchAsyncThunkPhotos.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchAsyncThunkPhotos.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default photoAsuncThunkSlice.reducer;
