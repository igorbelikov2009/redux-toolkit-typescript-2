import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "./../../models/types";

interface ITodoState {
  todos: ITodo[];
  isLoading: boolean;
  error: string;
}

const inintialState: ITodoState = {
  todos: [],
  isLoading: false,
  error: "",
};

export const todoSlice = createSlice({
  name: " todo",
  initialState: inintialState,
  reducers: {
    todosFetching(state) {
      state.isLoading = true;
    },
    todosFetchingSuccess(state, action: PayloadAction<ITodo[]>) {
      state.isLoading = false;
      state.todos = action.payload;
      state.error = "";
    },
    todosFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default todoSlice.reducer;
