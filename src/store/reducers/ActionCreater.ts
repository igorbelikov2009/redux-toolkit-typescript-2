import axios from "axios";
import { IUser } from "../../models/IUser";
import { AppDispacth } from "./../store";
import { userSlice } from "./UserSlice";
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
