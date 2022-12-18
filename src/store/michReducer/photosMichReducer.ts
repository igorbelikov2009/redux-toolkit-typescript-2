import { IPhoto } from "./../../models/types";
import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getPhotosMich = createAsyncThunk(
  "photos/getPhotosMich",
  async function (params: { limit: number; page: number }, { rejectWithValue }) {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?_limit=${params.limit}&_page=${params.page}`
      );

      const totalCount = response.headers["x-total-count"];
      const photos = response.data;
      const res = { totalCount, photos };
      return res;
    } catch (error: any) {
      return rejectWithValue("Не удалось загрузить список фото");
    }
  }
);

export const deletePhotoMich = createAsyncThunk(
  "photos/deletePhotoMich",
  async function (id: number, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`, {
        method: "DELETE",
      });
      //   console.log(response);
      if (!response.ok) {
        throw new Error("Не могу удалить фото. Ошибка на сервере.");
      }
      dispatch(removePhoto({ id }));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface IRes {
  totalCount: number;
  photos: IPhoto[];
}

interface IPhotoMichState {
  res: IRes;
  isLoading: boolean;
  error: string | null;
}

const initialState: IPhotoMichState = {
  res: {
    totalCount: 0,
    photos: [],
  },
  isLoading: false,
  error: null,
};

// Сделаем хэлпер для обработки ошибок в extraReducers
const setError = (state: IPhotoMichState, action: PayloadAction<string>) => {
  state.isLoading = false;
  state.error = action.payload;
};

const photosMichSlice = createSlice({
  name: "photosMich",
  initialState: initialState,
  reducers: {
    removePhoto(state, action) {
      state.res.photos = state.res.photos.filter((photo) => photo.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getPhotosMich.pending.type]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [getPhotosMich.fulfilled.type]: (state, action: PayloadAction<IRes>) => {
      state.res = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [getPhotosMich.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [deletePhotoMich.pending.type]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [deletePhotoMich.rejected.type]: setError,
  },
});
const { removePhoto } = photosMichSlice.actions;
export default photosMichSlice.reducer;
