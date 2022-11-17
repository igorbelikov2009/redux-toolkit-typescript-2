import axios from "axios";
import { IUser } from "../../models/IUser";

// БЕЗ ИСПОЛЬЗОВАНИЯ СПЕЦИАЛЬНОЙ НАДСТРОЙКОЙ createAsyncThunk()
import { AppDispacth } from "./../store";
import { userSlice } from "./UserSlice";

// //======================
// Для использования специальной надстройкИ createAsyncThunk()
import { createAsyncThunk } from "@reduxjs/toolkit";
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
// ситуации: сам запрос, индикацию его загрузки, и обработка ошибки
// //
export const fetchUsers = async (dispatch: AppDispacth) => {
  try {
    // Слайс создаёт для нас экшен-креатеры, поэтому, мы можем сразу их задиспачить.
    // Перед тем, как делать запрос, мы диспачим экшен usersFetching()
    dispatch(userSlice.actions.usersFetching());
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
