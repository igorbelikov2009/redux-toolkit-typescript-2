import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAlbum } from "../../models/types";

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

export const albumSlice = createSlice({
  name: "album",
  initialState: initialState,
  reducers: {
    albumsFetching(state) {
      state.isLoading = true;
    },
    albumsFetchingSuccess(state, action: PayloadAction<IAlbum[]>) {
      state.isLoading = false;
      state.albums = action.payload;
      state.error = "";
    },
    albumsFetchingError(state, acvtion: PayloadAction<string>) {
      state.isLoading = false;
      state.error = acvtion.payload;
    },
  },
});

export default albumSlice.reducer;
