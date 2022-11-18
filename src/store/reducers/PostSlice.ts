import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../../models/types";

// Создаём интерфейс для объекта, который мы ожидаем в качестве загрузки
interface IPostState {
  posts: IPost[];
  isLoading: boolean;
  error: string;
}

// Создаём объект типа IPostState, который мы ожидаем в качестве загрузки

const ininialState: IPostState = {
  posts: [],
  isLoading: false,
  error: "",
};

export const postSlice = createSlice({
  name: "post",
  initialState: ininialState,
  reducers: {
    // Первый редюсер будет вызываться в тот момент, когда мы начинаем подгрузку постов.
    postsFetching(state) {
      state.isLoading = true;
    },
    // Второй редюсер будет вызываться в случае успешной загрузки
    postsFetchingSuccess(state, action: PayloadAction<IPost[]>) {
      state.isLoading = false;
      state.error = ""; // обнуляем ошибку, на случай, если она была
      state.posts = action.payload;
    },
    postsFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// После создания слайса, мы можем вытащить из него отдельный редюсер
// и отдельный экшен-креатер таким образом
export default postSlice.reducer;
