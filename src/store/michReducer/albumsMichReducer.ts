import axios from "axios";
import { IAlbum } from "./../../models/types";
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

      if (!response) {
        // Если у меня будет ошибка, то я её поймаю
        throw new Error("Ошибка на сервере.");
      }

      // Если ошибки нет,то....
      const totalCount = response.headers["x-total-count"];
      const albums = await response.data;
      // console.log(totalCount, albums);
      const res = { totalCount, albums };

      return res;
    } catch (error: any) {
      // и передам ошибку определённым образом в extraReducers, в метод [fetchAlbumsMich.rejected.type],
      // где её можно будет корректно обработать.
      return rejectWithValue(error.message);
    }
  }
);

// dispatch достаём прямо отсюда
export const deleteAlbumMich = createAsyncThunk(
  "albums/deleteAlbumMich",
  async function (id: number, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
        method: "DELETE",
      });
      //   console.log(response);
      if (!response.ok) {
        throw new Error("Не могу удалить задачу. Ошибка на сервере.");
      }
      // Если ошибки нет, пришёл response.ok, то... на сервере нужный объект мы уже
      // удалили, нам нужно удалить его локально, вызвать removeAlbum() из albumsMichSlice.
      // Для того, чтобы его вызвать, у нас уже есть диспетчер.
      // Мы его получили через объект вторым параметром.
      dispatch(removeAlbum({ id }));
      //   const data = response.json();
      //   console.log(data);
      //   return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
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

      if (!response.ok) {
        throw new Error("Не могу обновить альбом. Ошибка на сервере.");
      }

      const data = await response.json();
      dispatch(editAlbum(data));
    } catch (error: any) {
      return rejectWithValue(error.message);
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

      if (!response.ok) {
        throw new Error("Не могу добавить новый альбом, ошибка на сервере.");
      }
      const data = await response.json();
      // console.log(data);
      dispatch(addAlbum(data));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface IRes {
  totalCount: number;
  albums: IAlbum[];
}

interface IAlbumsMichState {
  res: IRes;
  status: string | null;
  error: string | null;
}

const initialState: IAlbumsMichState = {
  res: {
    albums: [],
    totalCount: 0,
  },
  status: null,
  error: null,
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

    [deleteAlbumMich.pending.type]: (state) => {
      state.error = null;
    },
    [editAlbumMich.pending.type]: (state) => {
      state.error = null;
    },
    [editAlbumMich.rejected.type]: setError,
  },
});

const { addAlbum, removeAlbum, editAlbum } = albumsMichSlice.actions;
export default albumsMichSlice.reducer;
