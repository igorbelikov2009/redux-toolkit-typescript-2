import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "../../models/types";
import { fetchAsyncThunkTodos } from "./ActionCreater";

// Создаём интерфейс для initialState для слайс-редюсера
interface ITodoState {
  todos: ITodo[];
  isLoading: boolean;
  error: string;
}

// Создаём объект initialState типа ITodoState
const initialState: ITodoState = {
  todos: [],
  isLoading: false,
  error: "",
};

// Создаём редюсер-слайс при помощи функции createSlice()
export const todoAsyncThunkSlice = createSlice({
  name: "todoAsyncThunk",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchAsyncThunkTodos.fulfilled.type]: (state, action: PayloadAction<ITodo[]>) => {
      state.isLoading = false;
      state.todos = action.payload;
      state.error = "";
    },
    [fetchAsyncThunkTodos.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchAsyncThunkTodos.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default todoAsyncThunkSlice.reducer;
