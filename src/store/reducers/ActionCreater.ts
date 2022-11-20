import axios from "axios";
import { IAlbum, IComment, IPhoto, IPost, ITodo, IUser } from "../../models/types";

// БЕЗ ИСПОЛЬЗОВАНИЯ СПЕЦИАЛЬНОЙ НАДСТРОЙКОЙ createAsyncThunk()
import { AppDispacth } from "./../store";
import { userSlice } from "./UserSlice";

// //======================
// Для использования специальной надстройкИ createAsyncThunk()
import { createAsyncThunk } from "@reduxjs/toolkit";
import { postSlice } from "./PostSlice";
import { commentSlice } from "./CommentSlice";
import { albumSlice } from "./AlbumSlice";
import { todoSlice } from "./TodoSlice";
import { photoSlice } from "./PhotoSlice";

// //=====================

// Получение данных от сервера - это асинхронный процесс, поэтому создаём
// асинхронный экшен-креатер.
// По классике, асинхронные экшены создаются с помощью middlwaer, redux-thunk.
// И в redux-toolkit redux-thunk идёт уже под капотом, его в ручную подключать не надо.
// Для использования этого функционала, мы из экшен-креатера не возвращаем сразу экшен,
// а возвращаем другую функцию, которая аргументом принимаем диспатч.
// И, уже из этой функции, мы будем производить какие-то асинхронные действия.
// // =====================================================================
// Когда мы делаем запрос на сервер, неважно: создание это, обновление или
// получение каких-то данных, нам нужно обработать три, самые распространённые,
// ситуации: сам запрос, индикацию его загрузки, и обработка ошибки.

// БЕЗ ИСПОЛЬЗОВАНИЯ СПЕЦИАЛЬНОЙ НАДСТРОЙКОЙ createAsyncThunk()
export const fetchUsers = async (dispatch: AppDispacth) => {
  try {
    // Слайс создаёт для нас экшен-креатеры, поэтому, мы можем сразу их задиспачить.
    // Перед тем, как делать запрос, мы диспачим экшен usersFetching()
    dispatch(userSlice.actions.usersFetching());
    // делаем запрос
    const response = await axios.get<IUser[]>("https://jsonplaceholder.typicode.com/users");
    // После того, как запрос прошёл успешно, мы диспатчим экшен-креатер usersFetchingSuccess()
    // и туда передаём как раз массив пользователей - (response.data)
    dispatch(userSlice.actions.usersFetchingSuccess(response.data));
  } catch (e: any) {
    // Как payload, передаём туда некоторое сообщение об ошибке
    // Само сообщение мы получим из объекта error в поле (e.message)
    dispatch(userSlice.actions.usersFetchingError(e.message));
    // dispatch(userSlice.actions.usersFetchingError("Произошла ошибка загрузки"));
  }
};

export const fetchPosts = async (dispatch: AppDispacth) => {
  try {
    // Перед тем, как делать запрос, мы диспачим экшен postsFetching()
    dispatch(postSlice.actions.postsFetching());
    // делаем запрос
    const response = await axios.get<IPost[]>("https://jsonplaceholder.typicode.com/posts");
    // После того, как запрос прошёл успешно, мы диспатчим экшен-креатер postsFetchingSuccess()
    // и туда передаём массив постов - (response.data)
    dispatch(postSlice.actions.postsFetchingSuccess(response.data));
  } catch (e: any) {
    dispatch(postSlice.actions.postsFetchingError(e.message));
  }
};

export const fetchComments = async (dispatch: AppDispacth) => {
  try {
    // Перед тем, как делать запрос, мы диспачим экшен commentsFetching()
    dispatch(commentSlice.actions.commentsFetching());
    // делаем запрос
    const response = await axios.get<IComment[]>("https://jsonplaceholder.typicode.com/comments");
    // После того, как запрос прошёл успешно, мы диспатчим экшен-креатер commentsFetchingSuccess()
    // и туда передаём массив постов - (response.data)
    dispatch(commentSlice.actions.commentsFetchingSuccess(response.data));
  } catch (e: any) {
    dispatch(commentSlice.actions.commentsFetchingError(e.message));
  }
};

export const fetchAlbums = async (dispatch: AppDispacth) => {
  try {
    dispatch(albumSlice.actions.albumsFetching());
    const response = await axios.get<IAlbum[]>("https://jsonplaceholder.typicode.com/albums");
    dispatch(albumSlice.actions.albumsFetchingSuccess(response.data));
  } catch (e: any) {
    dispatch(albumSlice.actions.albumsFetchingError(e.message));
  }
};

export const fetchTodos = async (dispatch: AppDispacth) => {
  try {
    dispatch(todoSlice.actions.todosFetching());
    const response = await axios.get<ITodo[]>("https://jsonplaceholder.typicode.com/todos");
    dispatch(todoSlice.actions.todosFetchingSuccess(response.data));
  } catch (e: any) {
    dispatch(todoSlice.actions.todosFetchingError(e.message));
  }
};

export const fetchPhotos = async (dispatch: AppDispacth) => {
  try {
    dispatch(photoSlice.actions.photosFetching);
    const response = await axios.get<IPhoto[]>("https://jsonplaceholder.typicode.com/photos?_limit=100");
    dispatch(photoSlice.actions.photosFetchingSuccess(response.data));
  } catch (e: any) {
    dispatch(photoSlice.actions.photosFetchingError(e.message));
  }
};

// Мы обработали три сценария: загрузку, успешную загрузку, загрузку с ошибкой.
// redux-toolkit позволяет немного упростить обработку этих сценариев.
// Для того, чтобы использовать redux-thunk, мы создавали функцию, которая принимает
// аргументом dispatch и возвращает другую фунцию.

//========================================================
// Теперь мы можем воспользоваться
// уже специальной надстройкой - фунцией createAsyncThunk(), которая это делает за нас.
// Первым аргументом мы указываем название этого асинхронного танка-thunk
// (name: "userAsyncThunk", из UserAsyncThunkSlice.ts), а вторым аргументом передаём колбэк,
// внутри которого мы будем реализовывать какие-то действия, в нашем случае
// мы должны отправить запрос и вернуть какие-то данные.

export const fetchAsyncThunkUsers = createAsyncThunk("userAsyncThunk/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await axios.get<IUser[]>("https://jsonplaceholder.typicode.com/users");
    return response.data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue("Не удалось загрузить пользователей");
    // return thunkAPI.rejectWithValue(e.message);
  }
});

export const fetchAsyncThunkPosts = createAsyncThunk("postAsyncThunk/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await axios.get<IPost[]>("https://jsonplaceholder.typicode.com/posts");
    return response.data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue("Не удалось загрузить список постов");
  }
});

export const fetchAsyncThunkComments = createAsyncThunk("commentAsyncThunk/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await axios.get<IComment[]>("https://jsonplaceholder.typicode.com/comments");
    return response.data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue("Не удалось загрузить список комментариев");
  }
});

export const fetchAsyncThunkAlbums = createAsyncThunk("albumAsuncThunk/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await axios.get<IAlbum[]>("https://jsonplaceholder.typicode.com/albums");
    return response.data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue("Не удалось загрузить список альбомов");
  }
});

export const fetchAsyncThunkTodos = createAsyncThunk("todoAsyncThunk/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await axios.get<ITodo[]>("https://jsonplaceholder.typicode.com/todos");
    return response.data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue("Не удалось загрузить список дел");
  }
});

export const fetchAsyncThunkPhotos = createAsyncThunk("photoAsyncThunk/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await axios.get<IPhoto[]>("https://jsonplaceholder.typicode.com/photos?_limit=100");
    return response.data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue("Не удалось загрузить список фото");
  }
});
