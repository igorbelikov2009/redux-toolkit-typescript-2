import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { postAPI } from "../services/PostService";
import userReducer from "./reducers/UserSlice";

// Создаём корневой редюсер
const rootReducer = combineReducers({
  userReducer,

  // Регистрируем редюсер с PostSerice.ts как ключ-значение
  //               ключ: значение
  [postAPI.reducerPath]: postAPI.reducer,
});

// Создаём функцию setupStore, с помощью её мы будем конфигурировать
// Наше редакс-хранилище. Без использования toolkit мы использовали
// createReducer. Сейчас используем configureStore().
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    // добавляем мидлвеер из нашего postAPI
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postAPI.middleware),
  });
};

// Три базовых типа, которые нам в дальнейшей работе понадобятся
// Нам необходимо получить тип нашего состояния
export type RootState = ReturnType<typeof rootReducer>;
// Так же получим тип самого стора, с помощью ретюрнтайп
export type AppStore = ReturnType<typeof setupStore>;
// Так же получим тип dispatch нашего хранилища. Определив тип диспатча,
// мы не сможем задиспачить те экшены, которые мы не определили
export type AppDispacth = AppStore["dispatch"];
