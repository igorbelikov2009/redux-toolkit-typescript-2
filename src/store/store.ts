import { productAPI } from "./../services/ProductsService";
import { userAPI } from "./../services/UserService";
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
import todoSeparReducer from "./todoSeparSlice";
import counterReducer from "./reducers/CounterSlice";
import { commentAPI } from "../services/CommentService";
import { albumAPI } from "../services/AlbumService";
import { photoAPI } from "../services/PhotoService";

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
  todoSeparReducer,
  photoReducer,
  photoAsuncThunkReducer,
  counterReducer,

  // Регистрируем редюсер с PostService.ts как ключ-значение
  //               ключ: значение
  [postAPI.reducerPath]: postAPI.reducer,
  // Регистрируем редюсер с TodoService.ts как ключ-значение
  //               ключ: значение
  [todoAPI.reducerPath]: todoAPI.reducer,
  // Регистрируем редюсер с CommentService.ts как ключ-значение
  //               ключ: значение
  [commentAPI.reducerPath]: commentAPI.reducer,
  // Регистрируем редюсер с AlbumService.ts
  [albumAPI.reducerPath]: albumAPI.reducer,
  [photoAPI.reducerPath]: photoAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [productAPI.reducerPath]: productAPI.reducer,
  [todoAPI.reducerPath]: todoAPI.reducer,
});

// Создаём функцию setupStore, с помощью её мы будем конфигурировать
// наше редакс-хранилище. Без использования toolkit мы использовали
// createReducer. Сейчас используем configureStore().
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    // Добавляем к дефолтному мидлвееру, методом concat(), мидлвеер из нашего postAPI.
    // Затем, методом concat(), добавляем мидлвеер из нашего todoAPI
    // Затем, методом concat(), добавляем мидлвеер из нашего commentAPI
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(postAPI.middleware)
        .concat(todoAPI.middleware)
        .concat(commentAPI.middleware)
        .concat(albumAPI.middleware)
        .concat(photoAPI.middleware)
        .concat(userAPI.middleware)
        .concat(productAPI.middleware)
        .concat(todoAPI.middleware),
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
