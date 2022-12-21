import axios from "axios";
import { IAlbum, IPhoto } from "./../../models/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// экшены
export const fetchAlbumsMich = createAsyncThunk(
  "albums/fetchAlbumsMich",
  async function (params: { limit: number; page: number }, { rejectWithValue }) {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/albums?_limit=${params.limit}&_page=${params.page}`
      );
      // console.log(response);

      const totalCount = response.headers["x-total-count"];
      const albums = await response.data;
      // console.log(totalCount, albums);
      const res = { totalCount, albums };

      return res;
    } catch (error: any) {
      // и передам ошибку определённым образом в extraReducers, в метод [fetchAlbumsMich.rejected.type],
      // где её можно будет корректно обработать.
      return rejectWithValue("Не удалось получить альбомы, ошибка сервера!");
    }
  }
);

export const fetchAlbumByID = createAsyncThunk(
  "album/fetchAlbumByID",
  async function (id: string | undefined, { rejectWithValue }) {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/albums/" + id);
      // console.log(response);
      //
      const album = await response.data;
      // console.log(album);
      return album;
    } catch (error: any) {
      return rejectWithValue("Не удаётся получить альбом по ID, сетевая ошибка!");
    }
  }
);

export const fetchPhotosFromAlbums = createAsyncThunk(
  "album/fetchPhotosFromAlbums",
  async function (id: string | undefined, { rejectWithValue }) {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${id}/photos`);
      // console.log(response);

      const photos = await response.data;
      // console.log(photos);
      return photos;
    } catch (error: any) {
      return rejectWithValue("Не получается получить фото из альбома, сетевая ошибка");
    }
  }
);

// dispatch достаём прямо отсюда
export const deleteAlbumMich = createAsyncThunk(
  "albums/deleteAlbumMich",
  async function (id: number, { rejectWithValue, dispatch }) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
        method: "DELETE",
      });
      //   console.log(response);

      // На сервере нужный объект мы уже
      // удалили, нам нужно удалить его локально, вызвать removeAlbum() из albumsMichSlice.
      // Для того, чтобы его вызвать, у нас уже есть диспетчер.
      // Мы его получили через объект вторым параметром.
      dispatch(removeAlbum({ id }));
      //   const data = response.json();
      //   console.log(data);
      //   return data;
    } catch (error: any) {
      return rejectWithValue("Не удаётся удалить, сетевая ошибка! " + error.message);
    }
  }
);

// <any, number, { state: ??????? }>
export const editAlbumMich = createAsyncThunk<any, IAlbum, { state: any }>(
  "album/editAlbumMich",
  async function (album: IAlbum, { rejectWithValue, dispatch, getState }) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${album.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(album),
      });

      const data: IAlbum = await response.json();
      dispatch(editAlbum(data));
    } catch (error: any) {
      return rejectWithValue("Не могу обновить альбом. Ошибка на сервере.");
    }
  }
);

export const addAlbumMich = createAsyncThunk(
  "album/addAlbumMich",
  async function (album: IAlbum, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/albums", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(album),
      });
      // console.log(response);

      const data: IAlbum = await response.json();
      // console.log(data);
      dispatch(addAlbum(data));
    } catch (error: any) {
      return rejectWithValue("Не могу добавить новый альбом, ошибка на сервере.");
    }
  }
);

interface IRes {
  totalCount: number;
  albums: IAlbum[];
}

interface IAlbumsMichState {
  res: IRes;
  album: IAlbum;
  photos: IPhoto[];
  status: string | null;
  error: string | null;
  errorPhotos: string | null;
}

const initialState: IAlbumsMichState = {
  res: {
    albums: [],
    totalCount: 0,
  },
  album: { userId: "", id: 0, title: "" },
  photos: [],
  status: null,
  error: null,
  errorPhotos: null,
};

// Сделаем хэлпер для обработки ошибок в extraReducers
const setError = (state: IAlbumsMichState, action: PayloadAction<string>) => {
  state.status = "rejected";
  state.error = action.payload;
};

const albumsMichSlice = createSlice({
  name: "albumsMich",
  initialState: initialState,
  reducers: {
    addAlbum(state, action) {
      state.res.albums.push(action.payload);
    },
    removeAlbum(state, action) {
      state.res.albums = state.res.albums.filter((album) => album.id !== action.payload.id);
    },
    editAlbum(state, action) {
      // Нам нужно найти конкретный один элемент по id, который изменился.
      // Назовём его modifiedAlbum.
      let modifiedAlbum = state.res.albums.find((album) => album.id === action.payload.id);

      if (modifiedAlbum) {
        // Найденный объект можем изменить.
        modifiedAlbum = action.payload;
        if (modifiedAlbum) {
          // осталось изменить массив: вырезать из него изменяемый album, а вместо
          // него, вставить изменённый( по сути, вновь созданный альбом)
          state.res.albums = state.res.albums
            .splice(0, Number(modifiedAlbum.id - 1))
            .concat(modifiedAlbum)
            .concat(state.res.albums.splice(1));
          //========================================
          // console.log(action.payload);
          // console.log(modifiedAlbum);
          // console.log(modifiedAlbum.id);
          // console.log(state.albums);
        }
      }
    },
  },
  extraReducers: {
    [fetchAlbumsMich.pending.type]: (state) => {
      state.status = "loading";
      state.error = null; // Обнуляем, на всякий случай. Вдруг, прежде, была ошибка.
    },
    [fetchAlbumsMich.fulfilled.type]: (state, action: PayloadAction<IRes>) => {
      state.res = action.payload;
      state.status = "resolved";
    },
    [fetchAlbumsMich.rejected.type]: setError,

    [deleteAlbumMich.pending.type]: (state) => {
      state.error = null; // Обнуляем, на всякий случай. Вдруг, прежде, была ошибка.
    },
    [deleteAlbumMich.rejected.type]: setError,

    [editAlbumMich.pending.type]: (state) => {
      state.error = null;
    },
    [editAlbumMich.rejected.type]: setError,

    [addAlbumMich.pending.type]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [addAlbumMich.rejected.type]: setError,

    [fetchAlbumByID.pending.type]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchAlbumByID.fulfilled.type]: (state, action: PayloadAction<IAlbum>) => {
      state.status = "resolved";
      state.album = action.payload;
      // console.log(state.album);
    },
    [fetchAlbumByID.rejected.type]: setError,

    [fetchPhotosFromAlbums.pending.type]: (state) => {
      state.status = "loading";
      state.errorPhotos = null;
    },
    [fetchPhotosFromAlbums.fulfilled.type]: (state, action: PayloadAction<IPhoto[]>) => {
      state.status = "resolved";
      state.photos = action.payload;
    },
    [fetchPhotosFromAlbums.rejected.type]: (state, action: PayloadAction<string>) => {
      state.status = "rejected";
      state.errorPhotos = action.payload;
    },
  },
});

const { addAlbum, removeAlbum, editAlbum } = albumsMichSlice.actions;
export default albumsMichSlice.reducer;
