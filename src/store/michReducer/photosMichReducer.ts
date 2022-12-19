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
      const photos: IPhoto[] = response.data;
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

export const addPhotoMich = createAsyncThunk(
  "photo/addPhotoMich",
  async function (photo: IPhoto, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/photos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(photo),
      });
      // console.log(response);
      if (!response.ok) {
        throw new Error("Не могу добавить новый альбом, ошибка на сервере.");
      }
      const data: IPhoto = await response.json();
      // console.log(data);
      dispatch(addPhoto(data));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const editPhotoMich = createAsyncThunk<any, IPhoto, { state: any }>(
  "photo/editPhotoMich",
  async function (photo: IPhoto, { rejectWithValue, dispatch, getState }) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${photo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(photo),
      });

      if (!response.ok) {
        throw new Error("Не могу обновить фото. Ошибка на сервере.");
      }
      const data: IPhoto = await response.json();
      // console.log(data);
      dispatch(editPhoto(data));
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
    addPhoto(state, action) {
      state.res.photos.push(action.payload);
    },
    removePhoto(state, action) {
      state.res.photos = state.res.photos.filter((photo) => photo.id !== action.payload.id);
    },
    editPhoto(state, action) {
      // Нам нужно найти конкретный один элемент по id, который изменился.
      // Назовём его modifiedPhoto.
      let modifiedPhoto = state.res.photos.find((photo) => photo.id === action.payload.id);
      if (modifiedPhoto) {
        // Найденный объект можем изменить.
        modifiedPhoto = action.payload;
        if (modifiedPhoto) {
          // осталось изменить массив: вырезать из него изменяемый photo, а вместо
          // него, вставить изменённый( по сути, вновь созданное фото)
          state.res.photos = state.res.photos
            .splice(0, Number(modifiedPhoto.id - 1))
            .concat(modifiedPhoto)
            .concat(state.res.photos.splice(1));
          // console.log(action.payload);
          // console.log(modifiedPhoto);
          // console.log(modifiedPhoto.id);
        }
      }
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

    [editPhotoMich.pending.type]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [editPhotoMich.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
const { addPhoto, removePhoto, editPhoto } = photosMichSlice.actions;
export default photosMichSlice.reducer;
