import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { postAPI } from "../services/PostService";
import { todoAPI } from "../services/TodoService";
import userReducer from "./reducers/UserSlice";
import postReducer from "./reducers/PostSlice";
import commentReducer from "./reducers/CommentSlice";
import albumReducer from "./reducers/AlbumSlice";
import todoReducer from "./reducers/TodoSlice";
import photoReducer from "./reducers/PhotoSlice";
import photoAsuncThunkReducer from "./reducers/PhotoAsuncThunkSlice";
import albumAsuncThunkReducer from "./reducers/AlbumAsuncThunkSlice";
import userAsyncThunkReducer from "./reducers/UserAsyncThunkSlice";
import postAsuncThunkReducer from "./reducers/PostAsuncThunkSlice";
import commentAsyncThunkReducer from "./reducers/CommentAsyncThunkSlice";
import todoAsyncThunkReducer from "./reducers/TodoAsyncThunkSlice";
import counterReducer from "./reducers/CounterSlice";

// Создаём корневой редюсер, состоящий из комбинации всех редюсеров
const rootReducer = combineReducers({
  userReducer,
  userAsyncThunkReducer,
  postReducer,
  postAsuncThunkReducer,
  commentReducer,
  commentAsyncThunkReducer,
  albumReducer,
  albumAsuncThunkReducer,
  todoReducer,
  todoAsyncThunkReducer,
  photoReducer,
  photoAsuncThunkReducer,
  counterReducer,

  // Регистрируем редюсер с PostSerice.ts как ключ-значение
  //               ключ: значение
  [postAPI.reducerPath]: postAPI.reducer,
  // Регистрируем редюсер с TodoSerice.ts как ключ-значение
  //               ключ: значение
  [todoAPI.reducerPath]: todoAPI.reducer,
});

// Создаём функцию setupStore, с помощью её мы будем конфигурировать
// Наше редакс-хранилище. Без использования toolkit мы использовали
// createReducer. Сейчас используем configureStore().
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    // Добавляем к дефолтному мидлвееру, методом concat(), мидлвеер из нашего postAPI.
    // Затем, методом concat(), добавляем мидлвеер из нашего todoAPI
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postAPI.middleware).concat(todoAPI.middleware),
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
