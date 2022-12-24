import { IUser, IPost, ITodo, IAlbum } from "./../../models/types";
import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchUsersMich = createAsyncThunk(
  "users/fetchUsersMich",
  async function (params: { limit: number; page: number }, { rejectWithValue }) {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users?_limit=${params.limit}&_page=${params.page}`
      );
      //   console.log(response);
      const totalCount = response.headers["x-total-count"];
      const users = response.data;
      const res = { totalCount, users };
      //   console.log(res);
      return res;
    } catch (error: any) {
      return rejectWithValue("Не удалось получить список пользователей, сетевая ошибка!");
    }
  }
);

export const fetchUserMichById = createAsyncThunk(
  "user/fetchUserMichById",
  async function (id: string | undefined, { rejectWithValue }) {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users/" + id);
      // console.log(response);
      //
      const user = await response.data;
      // console.log(user);
      return user;
    } catch (error: any) {
      return rejectWithValue("Не удаётся открыть страницу пользователя, сетевая ошибка!");
    }
  }
);

export const getUsersPosts = createAsyncThunk(
  "user/getUsersPosts",
  async function (id: string | undefined, { rejectWithValue }) {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}/posts`);
      // console.log(response);
      const posts = await response.data;
      // console.log(posts);
      return posts;
    } catch (error: any) {
      return rejectWithValue("Не удаётся получить посты пользователя, сетевая ошибка!");
    }
  }
);

export const getUsersTodos = createAsyncThunk(
  "user/getUsersTodos",
  async function (id: string | undefined, { rejectWithValue }) {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}/todos`);
      // console.log(response);
      const todos = await response.data;
      // console.log(todos);
      return todos;
    } catch (error: any) {
      return rejectWithValue("Не удаётся получить список дел пользователя, сетевая ошибка!");
    }
  }
);

export const getUsersAlbums = createAsyncThunk(
  "user/getUsersAlbums",
  async function (id: string | undefined, { rejectWithValue }) {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}/albums`);
      // console.log(response);
      const albums = await response.data;
      // console.log(albums);
      return albums;
    } catch (error: any) {
      return rejectWithValue("Не удаётся получить список альбомов, сетевая ошибка!");
    }
  }
);

export const deleteUserMich = createAsyncThunk(
  "user/deleteUserMich",
  async function (id: number, { rejectWithValue, dispatch }) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE",
      });
      //   console.log(response);
      dispatch(removeUser({ id }));
      //   const data = response.json();
      //   console.log(data);
      //   return data;
    } catch (error: any) {
      return rejectWithValue("Не удаётся удалить, сетевая ошибка!");
    }
  }
);

export const addUserMich = createAsyncThunk(
  "user/addUserMich",
  async function (user: IUser, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      console.log(response);
      const data: IUser = await response.json();
      dispatch(addUser(data));
    } catch (error: any) {
      return rejectWithValue("Не могу добавить пользователя, ошибка на сервере.");
    }
  }
);

export const editUserMich = createAsyncThunk(
  "user/editUserMich",
  async function (user: IUser, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data: IUser = await response.json();
      console.log(data);
      dispatch(editUser(user));
    } catch (error: any) {
      return rejectWithValue("Не могу обновить пользователя, ошибка на сервере.");
    }
  }
);

interface IRes {
  totalCount: number;
  users: IUser[];
}

interface IUsersMichState {
  res: IRes;
  user: IUser;
  posts: IPost[];
  todos: ITodo[];
  albums: IAlbum[];
  isLoading: boolean;
  error: string;
}

const initialState: IUsersMichState = {
  res: {
    users: [],
    totalCount: 0,
  },
  user: {
    id: 0,
    name: "",
    username: "",
    email: "",
    phone: 0,
    website: "",

    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },

    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  },
  posts: [],
  todos: [],
  albums: [],
  isLoading: false,
  error: "",
};

// сделаем себе хэлпер
const setError = (state: { isLoading: boolean; error: string }, action: PayloadAction<string>) => {
  state.isLoading = true;
  state.error = action.payload;
};
const setPending = (state: { isLoading: boolean; error: string }, action: PayloadAction<string>) => {
  state.isLoading = true;
  state.error = "";
};

const usersMichSlice = createSlice({
  name: "usersMich",
  initialState: initialState,
  reducers: {
    addUser(state, action) {
      state.res.users.push(action.payload);
    },
    removeUser(state, action) {
      state.res.users = state.res.users.filter((user) => user.id !== action.payload.id);
    },
    editUser(state, action) {
      // Нам нужно найти конкретный один элемент по id, который изменился.
      // Назовём его modifiedUser.
      let modifiedUser = state.res.users.find((user) => user.id === action.payload.id);
      if (modifiedUser) {
        // Найденный объект можем изменить.
        modifiedUser = action.payload;
        if (modifiedUser) {
          // осталось изменить массив: вырезать из него изменяемый user, а вместо
          // него, вставить изменённый( по сути, вновь созданный пользователь)
          state.res.users = state.res.users
            .splice(0, Number(modifiedUser.id - 1))
            .concat(modifiedUser)
            .concat(state.res.users.splice(1));
        }
      }
    },
  },
  extraReducers: {
    [fetchUsersMich.pending.type]: setPending,
    [fetchUsersMich.fulfilled.type]: (state, action: PayloadAction<IRes>) => {
      state.isLoading = false;
      state.res = action.payload;
    },
    [fetchUsersMich.rejected.type]: setError,

    [deleteUserMich.pending.type]: setPending,
    [deleteUserMich.rejected.type]: setError,

    [addUserMich.pending.type]: setPending,
    [addUserMich.rejected.type]: setError,

    [fetchUserMichById.pending.type]: setPending,
    [fetchUserMichById.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [fetchUserMichById.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [getUsersPosts.pending.type]: setPending,
    [getUsersPosts.fulfilled.type]: (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
      state.isLoading = false;
    },
    [getUsersPosts.rejected.type]: setError,

    [getUsersTodos.pending.type]: setPending,
    [getUsersTodos.fulfilled.type]: (state, action: PayloadAction<ITodo[]>) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [getUsersTodos.rejected.type]: setError,

    [getUsersAlbums.pending.type]: setPending,
    [getUsersAlbums.fulfilled.type]: (state, action: PayloadAction<IAlbum[]>) => {
      state.isLoading = false;
      state.albums = action.payload;
    },
    [getUsersAlbums.rejected.type]: setError,
  },
});

const { addUser, removeUser, editUser } = usersMichSlice.actions;
export default usersMichSlice.reducer;
