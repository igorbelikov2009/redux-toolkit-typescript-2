import { IAlbum } from "./../../models/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { fetchAsyncThunkAlbums } from "./ActionCreater";

interface IAlbumState {
  albums: IAlbum[];
  isLoading: boolean;
  error: string;
}

const initialState: IAlbumState = {
  albums: [],
  isLoading: false,
  error: "",
};

export const albumAsuncThunkSlice = createSlice({
  name: "albumAsuncThunk",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchAsyncThunkAlbums.fulfilled.type]: (state, action: PayloadAction<IAlbum[]>) => {
      state.isLoading = false;
      state.albums = action.payload;
      state.error = "";
    },
    [fetchAsyncThunkAlbums.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchAsyncThunkAlbums.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default albumAsuncThunkSlice.reducer;
