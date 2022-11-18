import { fetchAsyncThunkComments } from "./ActionCreater";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "./../../models/types";

// Создаём интерфейс для initialState для слайс-редюсера
interface ICommentState {
  comments: IComment[];
  isLoading: boolean;
  error: string | undefined;
}

// Создаём объект initialState типа ICommentState
const initialState: ICommentState = {
  comments: [],
  isLoading: false,
  error: "",
};

// Создаём редюсер-слайс при помощи функции createSlice()
export const commentAsyncThunkSlice = createSlice({
  name: "commentAsyncThunk",
  initialState: initialState,
  reducers: {},
  // и создаём extraReducers, в нём для нас уже автоматически создаются
  // три состояния: pending (в ожидании), rejected (отклоненный)
  // и fulfilled (выполненный)
  extraReducers: {
    [fetchAsyncThunkComments.fulfilled.type]: (state, action: PayloadAction<IComment[]>) => {
      state.isLoading = false;
      state.error = "";
      state.comments = action.payload;
    },
    [fetchAsyncThunkComments.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchAsyncThunkComments.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
// После создания слайса, мы можем вытащить из него отдельный редюсер
// и отдельный экшен-креатер. Например:
export default commentAsyncThunkSlice.reducer;
