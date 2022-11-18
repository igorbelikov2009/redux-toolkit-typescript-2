import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "../../models/types";

// Создаём интерфейс для объекта, который мы ожидаем в качестве загрузки
interface ICommentState {
  comments: IComment[];
  isLoading: boolean;
  error: string;
}

// Создаём объект типа ICommentState, который мы ожидаем в качестве загрузки
const initialState: ICommentState = {
  comments: [],
  isLoading: false,
  error: "",
};

// Создаём редюсер при помощи фунции createSlice()
export const commentSlice = createSlice({
  name: "comment",
  initialState: initialState,
  reducers: {
    // Первый редюсер будет вызываться в тот момент, когда мы начинаем подгрузку комментов.
    commentsFetching(state) {
      state.isLoading = true;
    },
    // Второй редюсер будет вызываться в случае успешной загрузки
    commentsFetchingSuccess(state, action: PayloadAction<IComment[]>) {
      state.isLoading = false;
      state.error = "";
      state.comments = action.payload;
    },
    // Третий редюсер будет вызываться в случае загрузки с ошибкой
    commentsFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
// После создания слайса, мы можем вытащить из него отдельный редюсер
// и отдельный экшен-креатер таким образом
export default commentSlice.reducer;
